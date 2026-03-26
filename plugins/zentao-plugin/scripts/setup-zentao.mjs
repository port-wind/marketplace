import { fileURLToPath } from 'node:url';

import { setupZentao } from './run-zentao.mjs';

async function main() {
  const result = await setupZentao();
  console.log(JSON.stringify(result, null, 2));
  process.exit(result.ok ? 0 : 1);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  await main();
}
