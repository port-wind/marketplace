---
name: self-test-zentao
description: Run the ZenTao CLI self-test through the local zentao CLI.
---

# Self Test ZenTao

1. Run `command -v zentao >/dev/null || npm install -g @leeguoo/zentao-mcp`.
2. Run `zentao self-test`.
3. If successful, summarize the assigned active bug count and any per-product summary shown in stdout.
4. If the command reports missing login, tell the user to run `zentao login`.
