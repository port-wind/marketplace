---
name: list-products
description: List ZenTao products through the local zentao CLI wrapper.
---

# List Products

1. Run `node scripts/run-zentao.mjs products list`.
2. Parse the returned JSON wrapper result.
3. If successful, summarize the products in a short table or bullet list.
4. If the wrapper reports `NOT_LOGGED_IN`, tell the user to run `zentao login`.
5. If the wrapper reports `COMMAND_FAILED`, surface stderr and ask for the product scope only if needed.
