---
name: self-test-zentao
description: Run the ZenTao CLI self-test through the local zentao CLI wrapper.
---

# Self Test ZenTao

1. Run `node scripts/run-zentao.mjs self-test`.
2. Parse the returned JSON wrapper result.
3. If successful, summarize the assigned active bug count and any per-product summary shown in stdout.
4. If the wrapper reports `NOT_LOGGED_IN`, tell the user to run `zentao login`.
