import { execFile as execFileCallback, spawn } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

import { ensureCunzhi } from './ensure-cunzhi.mjs';

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

function normalizeOutput(value) {
  return typeof value === 'string' ? value.trim() : '';
}

async function defaultExec(command, args = []) {
  const result = await execFile(command, args, { encoding: 'utf8' });
  return {
    code: 0,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
  };
}

function defaultLaunch(command, args = []) {
  const child = spawn(command, args, {
    detached: true,
    stdio: 'ignore',
  });
  child.unref();
}

function buildInstallGuide() {
  return {
    ok: true,
    code: 'OK',
    recommended: {
      macOS: MACOS_INSTALL,
      otherPlatforms: `Download a release archive from ${RELEASE_URL} and add \`${SERVER_BINARY}\` plus \`${SETTINGS_BINARY}\` to PATH.`,
    },
    releaseUrl: RELEASE_URL,
    note: 'Use `等一下` after installation to open the settings window and copy the generated reference prompt.',
  };
}

function buildMcpConfig() {
  return {
    ok: true,
    code: 'OK',
    configSnippet: {
      mcpServers: {
        寸止: {
          command: SERVER_BINARY,
        },
      },
    },
    nextStep: 'Run `等一下` to open settings, review the enabled MCP tools, and copy the generated reference prompt into Cursor.',
  };
}

function buildPromptWorkflow() {
  return {
    ok: true,
    code: 'OK',
    steps: [
      'Install Cunzhi and confirm `寸止` plus `等一下` are on PATH.',
      'Run `等一下` to open the settings window.',
      'In the reference prompt tab, review the generated prompt and copy it into Cursor.',
      'If you want MCP support, add `{"mcpServers":{"寸止":{"command":"寸止"}}}` to your MCP client config.',
    ],
  };
}

async function getVersion(binary, exec = defaultExec) {
  const result = await exec(binary, ['--version']);
  return normalizeOutput(result.stdout || result.stderr);
}

export async function getCunzhiStatus({
  ensureCunzhi: ensureCunzhiFn = ensureCunzhi,
  exec = defaultExec,
} = {}) {
  const environment = await ensureCunzhiFn({ exec });
  if (!environment.ok) {
    return environment;
  }

  try {
    const [serverVersion, settingsVersion] = await Promise.all([
      getVersion(SERVER_BINARY, exec),
      getVersion(SETTINGS_BINARY, exec),
    ]);

    return {
      ok: true,
      code: 'OK',
      serverPath: environment.serverPath,
      settingsPath: environment.settingsPath,
      serverVersion,
      settingsVersion,
    };
  } catch (error) {
    return createCommandError('COMMAND_FAILED', 'Unable to read the Cunzhi binary versions.', {
      stdout: normalizeOutput(error.stdout),
      stderr: normalizeOutput(error.stderr),
      exitCode: error.code ?? 1,
    });
  }
}

export async function setupCunzhi({
  ensureCunzhi: ensureCunzhiFn = ensureCunzhi,
  exec = defaultExec,
} = {}) {
  const status = await getCunzhiStatus({ ensureCunzhi: ensureCunzhiFn, exec });
  if (!status.ok) {
    return status;
  }

  return {
    ...status,
    message: 'Cunzhi is installed and both `寸止` and `等一下` are ready to use.',
  };
}

export async function openCunzhiSettings({
  ensureCunzhi: ensureCunzhiFn = ensureCunzhi,
  exec = defaultExec,
  launch = defaultLaunch,
} = {}) {
  const environment = await ensureCunzhiFn({
    exec,
    requireServer: false,
    requireSettings: true,
  });

  if (!environment.ok) {
    return environment;
  }

  try {
    launch(SETTINGS_BINARY, []);
    return {
      ok: true,
      code: 'OK',
      settingsPath: environment.settingsPath,
      message: 'Opened the Cunzhi settings window.',
      nextStep: 'Use the settings window to review MCP tools and copy the generated reference prompt.',
    };
  } catch (error) {
    return createCommandError('COMMAND_FAILED', 'Unable to launch the Cunzhi settings window.', {
      stderr: error.message ?? '',
    });
  }
}

export async function runCunzhi({
  action = 'status',
  ensureCunzhi: ensureCunzhiFn = ensureCunzhi,
  exec = defaultExec,
  launch = defaultLaunch,
} = {}) {
  switch (action) {
    case 'status':
      return getCunzhiStatus({ ensureCunzhi: ensureCunzhiFn, exec });
    case 'setup':
      return setupCunzhi({ ensureCunzhi: ensureCunzhiFn, exec });
    case 'install-guide':
      return buildInstallGuide();
    case 'mcp-config':
      return buildMcpConfig();
    case 'prompt-workflow':
      return buildPromptWorkflow();
    case 'open-settings':
      return openCunzhiSettings({ ensureCunzhi: ensureCunzhiFn, exec, launch });
    default:
      return createCommandError('UNKNOWN_ACTION', 'Unknown Cunzhi action.', {
        supportedActions: ['status', 'setup', 'install-guide', 'mcp-config', 'prompt-workflow', 'open-settings'],
      });
  }
}

async function main() {
  const action = process.argv[2] ?? 'status';
  const result = await runCunzhi({ action });
  console.log(JSON.stringify(result, null, 2));
  process.exit(result.ok ? 0 : 1);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  await main();
}
