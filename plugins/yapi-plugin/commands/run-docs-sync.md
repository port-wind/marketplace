---
name: run-docs-sync
description: Run YApi docs-sync for one binding or for all configured bindings.
---

# Run Docs Sync

1. If a binding name is provided, run `node scripts/run-yapi.mjs docs-sync --binding <binding>`.
2. Otherwise run `node scripts/run-yapi.mjs docs-sync`.
3. Parse the response and summarize synced files or any reported failure.
4. If the command reports missing login or config, surface the wrapper guidance directly.
