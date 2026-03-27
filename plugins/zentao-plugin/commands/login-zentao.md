---
name: login-zentao
description: Prepare the local ZenTao CLI and then run zentao login using the upstream config flow.
---

# Login ZenTao

1. Run `command -v zentao >/dev/null || npm install -g @leeguoo/zentao-mcp`.
2. Run `zentao login`.
3. Tell the user that credentials are stored in `~/.config/zentao/config.toml`.
4. Remind the user that the ZenTao base URL usually includes `/zentao`.
5. Recommend running `zentao whoami` after login to confirm the environment.
