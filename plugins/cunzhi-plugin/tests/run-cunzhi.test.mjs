import test from 'node:test';
import assert from 'node:assert/strict';

import { getCunzhiStatus, openCunzhiSettings, runCunzhi, setupCunzhi } from '../scripts/run-cunzhi.mjs';

test('getCunzhiStatus returns versions when binaries are available', async () => {
  const ensureCunzhi = async () => ({
    ok: true,
    code: 'OK',
    serverPath: '/usr/local/bin/寸止',
    settingsPath: '/usr/local/bin/等一下',
  });
  const exec = async (command, args = []) => {
    const key = `${command} ${args.join(' ')}`.trim();
    if (key === '寸止 --version') return { code: 0, stdout: '寸止 v0.4.0\n', stderr: '' };
    if (key === '等一下 --version') return { code: 0, stdout: '寸止 v0.4.0\n', stderr: '' };
    throw new Error(`Unexpected command: ${key}`);
  };

  const result = await getCunzhiStatus({ ensureCunzhi, exec });

  assert.equal(result.ok, true);
  assert.equal(result.code, 'OK');
  assert.match(result.serverVersion, /0.4.0/);
  assert.match(result.settingsVersion, /0.4.0/);
});

test('setupCunzhi returns install guidance when binaries are missing', async () => {
  const ensureCunzhi = async () => ({
    ok: false,
    code: 'CLI_MISSING',
    missing: ['寸止'],
    nextStep: 'brew tap imhuso/cunzhi && brew install cunzhi',
  });

  const result = await setupCunzhi({ ensureCunzhi });

  assert.equal(result.ok, false);
  assert.equal(result.code, 'CLI_MISSING');
  assert.match(result.nextStep, /brew tap imhuso\/cunzhi/);
});

test('openCunzhiSettings launches the settings binary', async () => {
  const ensureCunzhi = async () => ({
    ok: true,
    code: 'OK',
    settingsPath: '/usr/local/bin/等一下',
  });
  const calls = [];
  const launch = (command, args = []) => {
    calls.push({ command, args });
  };

  const result = await openCunzhiSettings({ ensureCunzhi, launch });

  assert.equal(result.ok, true);
  assert.equal(result.code, 'OK');
  assert.deepEqual(calls, [{ command: '等一下', args: [] }]);
});

test('runCunzhi returns install guide and MCP config without local binaries', async () => {
  const installGuide = await runCunzhi({ action: 'install-guide' });
  const mcpConfig = await runCunzhi({ action: 'mcp-config' });

  assert.equal(installGuide.ok, true);
  assert.match(installGuide.recommended.macOS, /brew tap imhuso\/cunzhi/);
  assert.equal(mcpConfig.ok, true);
  assert.equal(mcpConfig.configSnippet.mcpServers.寸止.command, '寸止');
});
