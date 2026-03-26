---
name: get-interface-by-id
description: Fetch a YApi interface by numeric ID.
---

# Get Interface By ID

1. Ask for the interface ID if it is not already present.
2. Run `node scripts/run-yapi.mjs --path /api/interface/get --query id=<api_id>`.
3. Parse the returned payload.
4. Summarize the interface method, path, params, body schema, and response schema.
