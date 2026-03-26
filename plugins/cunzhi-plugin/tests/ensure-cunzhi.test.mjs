import test from 'node:test';
import assert from 'node:assert/strict';

import { ensureCunzhi } from '../scripts/ensure-cunzhi.mjs';

function createExecStub(handlers) {
  return async (command, args = []) => {
    const key = `${command} ${args.join(' ')}`.trim();
    const handler = handlers[key];

    if (!handler) {
      throw new Error(`Unexpected command: ${key}`);
    }

    if (handler.ok) {
      return {
        command,
        args,
        code: 0,
        stdout: handler.stdout ?? '',
        stderr: handler.stderr ?? '',
      };
    }

    const error = new Error(handler.stderr ?? 'command failed');
    error.code = handler.code ?? 1;
    error.stdout = handler.stdout ?? '';
    error.stderr = handler.stderr ?? '';
    throw error;
  };
}

test('returns node missing when node is not available', async () => {
  const exec = createExecStub({
    'which node': { ok: false, stderr: 'node missing' },
  });

  const result = await ensureCunzhi({ exec });

  assert.equal(result.ok, false);
  assert.equal(result.code, 'NODE_MISSING');
});

test('returns ok when both cunzhi binaries are installed', async () => {
  const exec = createExecStub({
    'which node': { ok: true, stdout: '/usr/bin/node\n' },
    'which 寸止': { ok: true, stdout: '/usr/local/bin/寸止\n' },
    'which 等一下': { ok: true, stdout: '/usr/local/bin/等一下\n' },
  });

  const result = await ensureCunzhi({ exec });

  assert.equal(result.ok, true);
  assert.equal(result.code, 'OK');
  assert.match(result.serverPath, /寸止/);
  assert.match(result.settingsPath, /等一下/);
});

test('returns missing binaries and install guidance when cunzhi is absent', async () => {
  const exec = createExecStub({
    'which node': { ok: true, stdout: '/usr/bin/node\n' },
    'which 寸止': { ok: false, stderr: 'missing' },
    'which 等一下': { ok: false, stderr: 'missing' },
  });

  const result = await ensureCunzhi({ exec });

  assert.equal(result.ok, false);
  assert.equal(result.code, 'CLI_MISSING');
  assert.deepEqual(result.missing, ['寸止', '等一下']);
  assert.match(result.nextStep, /brew tap imhuso\/cunzhi/);
  assert.match(result.nextStep, /releases/);
});

test('can validate only the settings binary for settings workflows', async () => {
  const exec = createExecStub({
    'which node': { ok: true, stdout: '/usr/bin/node\n' },
    'which 等一下': { ok: true, stdout: '/usr/local/bin/等一下\n' },
  });

  const result = await ensureCunzhi({ exec, requireServer: false, requireSettings: true });

  assert.equal(result.ok, true);
  assert.equal(result.code, 'OK');
  assert.match(result.settingsPath, /等一下/);
});
