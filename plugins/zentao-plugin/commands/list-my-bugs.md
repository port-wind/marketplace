---
name: list-my-bugs
description: List the current user's ZenTao bugs through the local zentao CLI wrapper.
---

# List My Bugs

1. Run `node scripts/run-zentao.mjs bugs mine --status active --include-details`.
2. Parse the returned JSON wrapper result.
3. If successful, summarize the product totals first, then list individual bugs when the payload includes them.
4. If the wrapper reports `NOT_LOGGED_IN`, tell the user to run `zentao login`.
