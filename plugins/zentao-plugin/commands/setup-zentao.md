---
name: setup-zentao
description: Install or verify the ZenTao CLI and report whether login is required.
---

# Setup ZenTao

1. Run `node scripts/setup-zentao.mjs`.
2. Read the returned JSON result.
3. If the result code is `NOT_LOGGED_IN`, tell the user to run `zentao login`.
4. If the result code is not `OK`, surface the message, stderr, and next step.
5. If the result code is `OK`, summarize whether the CLI was auto-installed and whether ZenTao is ready.
