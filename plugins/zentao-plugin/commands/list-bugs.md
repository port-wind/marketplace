---
name: list-bugs
description: List ZenTao bugs for a product through the local zentao CLI wrapper.
---

# List Bugs

1. Require a numeric product ID before running the command.
2. Run `node scripts/run-zentao.mjs bugs list --product <id>`.
3. Parse the returned JSON wrapper result.
4. If successful, summarize the bugs with bug ID, title, status, priority, severity, and assignee.
5. If the wrapper reports `NOT_LOGGED_IN`, tell the user to run `zentao login`.
