---
name: bind-docs-sync
description: Create a docs-sync binding between local docs and a YApi category.
---

# Bind Docs Sync

1. Confirm the binding name, local directory, project ID, and category ID.
2. Run `node scripts/run-yapi.mjs docs-sync bind add --name <binding> --dir <path> --project-id <project_id> --catid <catid>`.
3. Parse the command output.
4. Summarize the created binding and mention that metadata is stored under `.yapi/`.
