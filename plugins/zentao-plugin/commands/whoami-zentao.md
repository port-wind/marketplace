---
name: whoami-zentao
description: Show the current ZenTao login identity from the local zentao CLI.
---

# Who Am I

1. Run `node scripts/run-zentao.mjs whoami`.
2. Parse the returned JSON.
3. If successful, summarize the current ZenTao account and base URL.
4. If the wrapper reports `NOT_LOGGED_IN`, tell the user to run `zentao login`.
