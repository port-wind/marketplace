---
name: list-bugs
description: List ZenTao bugs for a product through the local zentao CLI.
---

# List Bugs

1. Require a numeric product ID before running the command.
2. Run `command -v zentao >/dev/null || npm install -g @leeguoo/zentao-mcp`.
3. Run `zentao bugs list --product <id>`.
4. If successful, summarize the bugs with bug ID, title, status, priority, severity, and assignee.
5. If the command reports missing login, tell the user to run `zentao login`.
