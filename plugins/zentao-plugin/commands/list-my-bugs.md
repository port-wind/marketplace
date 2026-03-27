---
name: list-my-bugs
description: List the current user's ZenTao bugs through the local zentao CLI.
---

# List My Bugs

1. Run `command -v zentao >/dev/null || npm install -g @leeguoo/zentao-mcp`.
2. Run `zentao bugs mine --status active --include-details`.
3. If successful, summarize the product totals first, then list individual bugs when the payload includes them.
4. If the command reports missing login, tell the user to run `zentao login`.
