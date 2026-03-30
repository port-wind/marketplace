#!/usr/bin/env node

import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { execFile as execFileCallback } from 'node:child_process';
import { promisify } from 'node:util';

const execFile = promisify(execFileCallback);

const PLUGIN_REPO_MAP = {
  'leeguooooo/yapi-plugin': 'yapi-plugin',
  'leeguooooo/zentao-plugin': 'zentao-plugin',
  'leeguooooo/curl-crypto-plugin': 'curl-crypto-plugin',
};

const RSYNC_EXCLUDES = ['.git', 'node_modules', 'dist', '.astro', 'coverage', 'vendor/runtime.dat'];

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

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const sourceRepo = args.repo;
  const pluginDir = args.plugin || PLUGIN_REPO_MAP[sourceRepo];
  const sourceRef = normalizeRef(args.ref);
  const sourceSha = args.sha || '';

  if (!sourceRepo) {
    throw new Error('Missing required --repo argument.');
  }

  if (!pluginDir) {
    throw new Error(`No plugin mapping configured for ${sourceRepo}.`);
  }

  const workspace = process.cwd();
  const targetDir = path.join(workspace, 'plugins', pluginDir);
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'marketplace-sync-'));
  const cloneDir = path.join(tempRoot, 'source');

  try {
    await run('git', ['clone', '--depth', '1', '--branch', sourceRef, `https://github.com/${sourceRepo}.git`, cloneDir]);

    if (sourceSha) {
      const current = await run('git', ['rev-parse', 'HEAD'], { cwd: cloneDir });
      if (current.stdout !== sourceSha) {
        await run('git', ['fetch', '--depth', '1', 'origin', sourceSha], { cwd: cloneDir });
        await run('git', ['checkout', '--detach', 'FETCH_HEAD'], { cwd: cloneDir });
      }
    }

    const rsyncArgs = ['-a', '--delete'];
    for (const exclude of RSYNC_EXCLUDES) {
      rsyncArgs.push(`--exclude=${exclude}`);
    }
    rsyncArgs.push(`${cloneDir}/`, `${targetDir}/`);

    await run('rsync', rsyncArgs);

    const result = {
      ok: true,
      sourceRepo,
      sourceRef,
      sourceSha,
      pluginDir,
      targetDir: path.relative(workspace, targetDir),
    };

    if (process.env.GITHUB_OUTPUT) {
      const lines = [
        `plugin_dir=${pluginDir}`,
        `source_repo=${sourceRepo}`,
        `source_ref=${sourceRef}`,
      ];
      await import('node:fs/promises').then(({ appendFile }) =>
        appendFile(process.env.GITHUB_OUTPUT, `${lines.join('\n')}\n`, 'utf8')
      );
    }

    console.log(JSON.stringify(result, null, 2));
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}

await main();
