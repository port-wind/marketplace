---
name: setup-zentao
description: Install or verify the ZenTao CLI and report whether login is required.
---

# Setup ZenTao

1. Run `command -v zentao >/dev/null || npm install -g @leeguoo/zentao-mcp`.
2. Run `zentao whoami`.
3. If `zentao whoami` reports a login or config problem, tell the user to run `zentao login`.
4. If setup succeeds, summarize that ZenTao is ready and include the current account plus base URL if available.
