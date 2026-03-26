import { execFile as execFileCallback } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

import { ensureZentao } from './ensure-zentao.mjs';

const execFile = promisify(execFileCallback);

function createCommandError(code, message, extra = {}) {
  return {
    ok: false,
    code,
    message,
    ...extra,
  };
}

function normalizeOutput(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function isLoginError(output) {
  return /missing credentials|token request failed|not logged in|login|config\.toml/i.test(output);
}

async function defaultExec(command, args = []) {
  const result = await execFile(command, args, { encoding: 'utf8' });
  return {
    code: 0,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
  };
}

export async function runZentao({
  args = [],
  ensureZentao: ensureZentaoFn = ensureZentao,
  exec = defaultExec,
} = {}) {
  const environment = await ensureZentaoFn({ exec });
  if (!environment.ok) {
    return environment;
  }

  try {
    const result = await exec('zentao', args);
    return {
      ok: true,
      code: 'OK',
      stdout: normalizeOutput(result.stdout),
      stderr: normalizeOutput(result.stderr),
      autoInstalled: environment.autoInstalled,
    };
  } catch (error) {
    const stdout = normalizeOutput(error.stdout);
    const stderr = normalizeOutput(error.stderr);
    const combined = `${stdout}\n${stderr}\n${error.message ?? ''}`.trim();

    if (isLoginError(combined)) {
      return createCommandError('NOT_LOGGED_IN', 'ZenTao CLI is not logged in.', {
        stdout,
        stderr,
        nextStep: 'Run `zentao login` to authenticate with your ZenTao server.',
      });
    }

    return createCommandError('COMMAND_FAILED', 'ZenTao CLI command failed.', {
      stdout,
      stderr,
      exitCode: error.code ?? 1,
    });
  }
}

export async function setupZentao({
  ensureZentao: ensureZentaoFn = ensureZentao,
  exec = defaultExec,
} = {}) {
  const environment = await ensureZentaoFn({ exec });
  if (!environment.ok) {
    return environment;
  }

  const whoami = await runZentao({
    args: ['whoami'],
    ensureZentao: async () => environment,
    exec,
  });

  if (!whoami.ok) {
    return {
      ...whoami,
      autoInstalled: environment.autoInstalled,
      nextStep: whoami.code === 'NOT_LOGGED_IN' ? 'Run `zentao login` and retry setup.' : whoami.nextStep,
    };
  }

  return {
    ok: true,
    code: 'OK',
    autoInstalled: environment.autoInstalled,
    stdout: whoami.stdout,
    message: environment.autoInstalled
      ? 'ZenTao CLI was installed and is ready to use.'
      : 'ZenTao CLI is already installed and ready to use.',
  };
}

async function main() {
  const result = await runZentao({ args: process.argv.slice(2) });
  console.log(JSON.stringify(result, null, 2));
  process.exit(result.ok ? 0 : 1);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  await main();
}
