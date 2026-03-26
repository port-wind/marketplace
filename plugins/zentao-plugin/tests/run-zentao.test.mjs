import test from 'node:test';
import assert from 'node:assert/strict';

import { runZentao, setupZentao } from '../scripts/run-zentao.mjs';

test('runZentao returns stdout when command succeeds', async () => {
  const ensureZentao = async () => ({ ok: true, code: 'OK', autoInstalled: false });
  const exec = async (command, args = []) => {
    assert.equal(command, 'zentao');
    assert.deepEqual(args, ['whoami']);
    return { code: 0, stdout: 'leo\nurl: https://zentao.example.com/zentao\n', stderr: '' };
  };

  const result = await runZentao({ args: ['whoami'], ensureZentao, exec });

  assert.equal(result.ok, true);
  assert.equal(result.code, 'OK');
  assert.match(result.stdout, /leo/);
});

test('runZentao maps login failures to NOT_LOGGED_IN', async () => {
  const ensureZentao = async () => ({ ok: true, code: 'OK', autoInstalled: false });
  const exec = async () => {
    const error = new Error('Missing credentials. Provide flags/env, or run interactively.');
    error.code = 1;
    error.stdout = '';
    error.stderr = 'Missing credentials. Provide flags/env, or run interactively.';
    throw error;
  };

  const result = await runZentao({ args: ['whoami'], ensureZentao, exec });

  assert.equal(result.ok, false);
  assert.equal(result.code, 'NOT_LOGGED_IN');
});

test('runZentao returns command failure for other errors', async () => {
  const ensureZentao = async () => ({ ok: true, code: 'OK', autoInstalled: false });
  const exec = async () => {
    const error = new Error('unknown failure');
    error.code = 2;
    error.stdout = '';
    error.stderr = 'unknown failure';
    throw error;
  };

  const result = await runZentao({ args: ['products', 'list'], ensureZentao, exec });

  assert.equal(result.ok, false);
  assert.equal(result.code, 'COMMAND_FAILED');
  assert.equal(result.exitCode, 2);
});

test('setupZentao returns next step when login is required', async () => {
  const ensureZentao = async () => ({ ok: true, code: 'OK', autoInstalled: true });
  const exec = async () => {
    const error = new Error('Token request failed: invalid');
    error.code = 1;
    error.stdout = '';
    error.stderr = 'Token request failed: invalid';
    throw error;
  };

  const result = await setupZentao({ ensureZentao, exec });

  assert.equal(result.ok, false);
  assert.equal(result.code, 'NOT_LOGGED_IN');
  assert.match(result.nextStep, /zentao login/);
});
