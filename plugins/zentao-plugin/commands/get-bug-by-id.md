---
name: get-bug-by-id
description: Fetch ZenTao bug details by numeric ID through the local zentao CLI.
---

# Get Bug By ID

1. Require a numeric bug ID before running the command.
2. Run `command -v zentao >/dev/null || npm install -g @leeguoo/zentao-mcp`.
3. Run `zentao bug get --id <id>`.
4. If successful, summarize the bug title, status, priority, severity, assignee, opener, resolver, and any other visible metadata.
5. If the command reports missing login, tell the user to run `zentao login`.
