---
name: list-category-interfaces
description: List YApi interfaces under a category ID.
---

# List Category Interfaces

1. Ask for the category ID if it is not already present.
2. Run `node scripts/run-yapi.mjs --path /api/interface/list_cat --query catid=<catid>`.
3. Parse the response.
4. Return the interface list with IDs and paths when available.
