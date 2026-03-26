import { execFile as execFileCallback } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const execFile = promisify(execFileCallback);

const SERVER_BINARY = '寸止';
const SETTINGS_BINARY = '等一下';
const RELEASE_URL = 'https://github.com/imhuso/cunzhi/releases';
const MACOS_INSTALL = 'brew tap imhuso/cunzhi && brew install cunzhi';

function createCommandError(code, message, extra = {}) {
  return {
    ok: false,
    code,
    message,
    ...extra,
  };
}

async function defaultExec(command, args = []) {
  const result = await execFile(command, args, { encoding: 'utf8' });

  return {
    code: 0,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
  };
}

async function findBinary(binary, exec = defaultExec) {
  const locator = process.platform === 'win32' ? 'where' : 'which';
  const result = await exec(locator, [binary]);
  return (result.stdout ?? '').trim();
}

function toInstallGuidance() {
  return [
    `macOS: ${MACOS_INSTALL}`,
    `Other platforms: download the release archive from ${RELEASE_URL} and add \`${SERVER_BINARY}\` and \`${SETTINGS_BINARY}\` to PATH.`,
  ].join(' ');
}

export async function ensureCunzhi({
  exec = defaultExec,
  requireServer = true,
  requireSettings = true,
} = {}) {
  try {
    await findBinary('node', exec);
  } catch (error) {
    return createCommandError('NODE_MISSING', 'Node.js is required to run the Cunzhi plugin.', {
      stderr: error.stderr ?? '',
    });
  }

  const missing = [];
  const binaries = {};

  if (requireServer) {
    try {
      binaries.serverPath = await findBinary(SERVER_BINARY, exec);
    } catch {
      missing.push(SERVER_BINARY);
    }
  }

  if (requireSettings) {
    try {
      binaries.settingsPath = await findBinary(SETTINGS_BINARY, exec);
    } catch {
      missing.push(SETTINGS_BINARY);
    }
  }

  if (missing.length > 0) {
    return createCommandError('CLI_MISSING', 'Cunzhi is not fully installed on this machine.', {
      missing,
      nextStep: toInstallGuidance(),
      releaseUrl: RELEASE_URL,
      macOSInstall: MACOS_INSTALL,
    });
  }

  return {
    ok: true,
    code: 'OK',
    ...binaries,
  };
}

async function main() {
  const result = await ensureCunzhi();
  console.log(JSON.stringify(result, null, 2));
  process.exit(result.ok ? 0 : 1);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  await main();
}
