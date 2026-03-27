---
name: check-cunzhi-status
description: Inspect the installed 寸止 and 等一下 binaries and summarize their versions.
---

# Check Cunzhi Status

1. Run:
   - `command -v 寸止`
   - `command -v 等一下`
2. If both exist, run:
   - `寸止 --version`
   - `等一下 --version`
3. Summarize the binary paths and versions.
4. If either binary is missing, include the install guidance:
   - macOS: `brew tap imhuso/cunzhi && brew install cunzhi`
   - other platforms: `https://github.com/imhuso/cunzhi/releases`
