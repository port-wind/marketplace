---
name: whoami-zentao
description: Show the current ZenTao login identity from the local zentao CLI.
---

# Who Am I

1. Run `command -v zentao >/dev/null || npm install -g @leeguoo/zentao-mcp`.
2. Run `zentao whoami`.
3. If successful, summarize the current ZenTao account and base URL.
4. If the command reports missing login, tell the user to run `zentao login`.
