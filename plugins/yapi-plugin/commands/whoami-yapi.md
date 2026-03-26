---
name: whoami-yapi
description: Show the current YApi login identity from the local yapi CLI.
---

# Who Am I

1. Run `node scripts/run-yapi.mjs whoami`.
2. Parse the returned JSON.
3. If successful, summarize the current YApi identity.
4. If the wrapper reports `NOT_LOGGED_IN`, tell the user to run `yapi login`.
