---
name: check-cunzhi-status
description: Inspect the installed 寸止 and 等一下 binaries and summarize their versions.
---

# Check Cunzhi Status

1. Run `node scripts/run-cunzhi.mjs status`.
2. Parse the returned JSON.
3. If successful, summarize the binary paths and versions for `寸止` and `等一下`.
4. If the wrapper reports `CLI_MISSING`, tell the user which binary is missing and include the returned install guidance.
