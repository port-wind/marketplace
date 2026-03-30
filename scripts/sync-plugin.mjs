#!/usr/bin/env node

import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { execFile as execFileCallback } from 'node:child_process';
import { promisify } from 'node:util';

const execFile = promisify(execFileCallback);

const PLUGIN_REPO_MAP = {
  'leeguooooo/yapi-plugin': { pluginDir: 'yapi-plugin', ref: 'main' },
  'leeguooooo/zentao-plugin': { pluginDir: 'zentao-plugin', ref: 'main' },
  'leeguooooo/curl-crypto-plugin': { pluginDir: 'curl-crypto-plugin', ref: 'main' },
};

const RSYNC_EXCLUDES = ['.git', 'node_modules', 'dist', '.astro', 'coverage', 'vendor/runtime.dat'];
const SYNC_STATE_FILENAME = '.marketplace-sync.json';

function parseArgs(argv) {
  const options = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith('--')) {
      continue;
    }

    const key = token.slice(2);
    const next = argv[index + 1];
    if (next && !next.startsWith('--')) {
      options[key] = next;
      index += 1;
    } else {
      options[key] = 'true';
    }
  }

  return options;
}

function normalizeRef(ref = '') {
  if (!ref) {
    return 'main';
  }

  return ref.replace(/^refs\/heads\//, '').replace(/^refs\/tags\//, '');
}

function getConfiguredPlugins(selectedRepo = '') {
  if (selectedRepo) {
    const entry = PLUGIN_REPO_MAP[selectedRepo];
    if (!entry) {
      throw new Error(`No plugin mapping configured for ${selectedRepo}.`);
    }

    return [[selectedRepo, entry]];
  }

  return Object.entries(PLUGIN_REPO_MAP);
}

async function run(command, args, options = {}) {
  const result = await execFile(command, args, {
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
    ...options,
  });

  return {
    stdout: result.stdout?.trim() ?? '',
    stderr: result.stderr?.trim() ?? '',
  };
}

async function readSyncState(pluginRoot) {
  try {
    const raw = await readFile(path.join(pluginRoot, SYNC_STATE_FILENAME), 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function writeSyncState(pluginRoot, state) {
  await writeFile(path.join(pluginRoot, SYNC_STATE_FILENAME), `${JSON.stringify(state, null, 2)}\n`, 'utf8');
}

async function getRemoteSha(sourceRepo, sourceRef) {
  const result = await run('git', ['ls-remote', `https://github.com/${sourceRepo}.git`, `refs/heads/${sourceRef}`]);
  const [sha] = result.stdout.split(/\s+/, 1);

  if (!sha) {
    throw new Error(`Unable to resolve ${sourceRepo}@${sourceRef}.`);
  }

  return sha;
}

async function syncSinglePlugin({ workspace, sourceRepo, pluginDir, sourceRef, force = false }) {
  const targetDir = path.join(workspace, 'plugins', pluginDir);
  const syncState = await readSyncState(targetDir);
  const remoteSha = await getRemoteSha(sourceRepo, sourceRef);

  if (!force && syncState?.sourceRepo === sourceRepo && syncState?.sourceRef === sourceRef && syncState?.sourceSha === remoteSha) {
    return {
      status: 'skipped',
      sourceRepo,
      sourceRef,
      sourceSha: remoteSha,
      pluginDir,
      reason: 'already-synced',
    };
  }

  const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'marketplace-sync-'));
  const cloneDir = path.join(tempRoot, 'source');

  try {
    await run('git', ['clone', '--depth', '1', '--branch', sourceRef, `https://github.com/${sourceRepo}.git`, cloneDir]);

    const rsyncArgs = ['-a', '--delete'];
    for (const exclude of RSYNC_EXCLUDES) {
      rsyncArgs.push(`--exclude=${exclude}`);
    }
    rsyncArgs.push(`${cloneDir}/`, `${targetDir}/`);

    await run('rsync', rsyncArgs);

    await writeSyncState(targetDir, {
      sourceRepo,
      sourceRef,
      sourceSha: remoteSha,
      syncedAt: new Date().toISOString(),
    });

    return {
      status: 'updated',
      sourceRepo,
      sourceRef,
      sourceSha: remoteSha,
      pluginDir,
      targetDir: path.relative(workspace, targetDir),
    };
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const sourceRepo = args.repo || '';
  const force = args.force === 'true';
  const configuredPlugins = getConfiguredPlugins(sourceRepo);

  const workspace = process.cwd();
  const results = [];

  for (const [repoName, entry] of configuredPlugins) {
    results.push(
      await syncSinglePlugin({
        workspace,
        sourceRepo: repoName,
        pluginDir: args.plugin || entry.pluginDir,
        sourceRef: normalizeRef(args.ref || entry.ref),
        force,
      })
    );
  }

  const summary = {
    ok: true,
    updated: results.filter((item) => item.status === 'updated'),
    skipped: results.filter((item) => item.status === 'skipped'),
  };

  console.log(JSON.stringify(summary, null, 2));
}

await main();
