---
name: setup-cunzhi
description: Verify whether 寸止 and 等一下 are installed locally and summarize the next step.
---

# Setup Cunzhi

1. Run `node scripts/setup-cunzhi.mjs`.
2. Parse the returned JSON result.
3. If the result code is `CLI_MISSING`, tell the user which binary is missing and quote the returned install guidance.
4. If the result code is not `OK`, surface the message, stderr, and next step.
5. If the result code is `OK`, summarize the installed paths and versions for `寸止` and `等一下`.
