---
name: login-yapi
description: Prepare the local YApi CLI and then run yapi login using the user's existing config flow.
---

# Login YApi

1. Run `node scripts/ensure-yapi.mjs`.
2. If setup fails, stop and report the returned JSON.
3. If setup succeeds, run `yapi login`.
4. Tell the user that credentials are stored in `~/.yapi/config.toml`.
5. Recommend running `node scripts/setup-yapi.mjs` after login to confirm the environment.
