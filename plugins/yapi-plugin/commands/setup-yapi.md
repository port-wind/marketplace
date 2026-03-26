---
name: setup-yapi
description: Install or verify the YApi CLI and report whether login is required.
---

# Setup YApi

1. Run `node scripts/setup-yapi.mjs`.
2. Read the returned JSON result.
3. If the result code is `NOT_LOGGED_IN`, tell the user to run `yapi login`.
4. If the result code is not `OK`, surface the message, stderr, and next step.
5. If the result code is `OK`, summarize whether the CLI was auto-installed and whether YApi is ready.
