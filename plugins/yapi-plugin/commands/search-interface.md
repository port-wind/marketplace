---
name: search-interface
description: Search YApi interfaces by keyword through the local yapi CLI.
---

# Search Interface

1. Ask for the search keyword if it is not already present in the conversation.
2. Run `node scripts/run-yapi.mjs search --q <keyword>`.
3. Parse the returned JSON or CLI output.
4. Summarize the most relevant matching interfaces and include IDs when available.
