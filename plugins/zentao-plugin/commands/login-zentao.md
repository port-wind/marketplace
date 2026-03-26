---
name: login-zentao
description: Prepare the local ZenTao CLI and then run zentao login using the upstream config flow.
---

# Login ZenTao

1. Run `node scripts/ensure-zentao.mjs`.
2. If setup fails, stop and report the returned JSON.
3. If setup succeeds, run `zentao login`.
4. Tell the user that credentials are stored in `~/.config/zentao/config.toml`.
5. Remind the user that the ZenTao base URL usually includes `/zentao`.
6. Recommend running `node scripts/setup-zentao.mjs` after login to confirm the environment.
