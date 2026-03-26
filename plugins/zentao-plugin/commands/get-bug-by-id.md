---
name: get-bug-by-id
description: Fetch ZenTao bug details by numeric ID through the local zentao CLI wrapper.
---

# Get Bug By ID

1. Require a numeric bug ID before running the command.
2. Run `node scripts/run-zentao.mjs bug get --id <id>`.
3. Parse the returned JSON wrapper result.
4. If successful, summarize the bug title, status, priority, severity, assignee, opener, resolver, and any other visible metadata.
5. If the wrapper reports `NOT_LOGGED_IN`, tell the user to run `zentao login`.
