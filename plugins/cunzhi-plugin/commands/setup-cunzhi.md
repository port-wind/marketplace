---
name: setup-cunzhi
description: Verify whether 寸止 and 等一下 are installed locally and summarize the next step.
---

# Setup Cunzhi

1. Run:
   - `command -v 寸止 >/dev/null && echo "寸止: 已安装" || echo "寸止: 未安装"`
   - `command -v 等一下 >/dev/null && echo "等一下: 已安装" || echo "等一下: 未安装"`
2. If either binary is missing, tell the user which one is missing.
3. Recommend the upstream install path:
   - macOS: `brew tap imhuso/cunzhi && brew install cunzhi`
   - other platforms: download the release archive from `https://github.com/imhuso/cunzhi/releases` and add both binaries to PATH
4. If both binaries exist, also run:
   - `寸止 --version`
   - `等一下 --version`
5. Summarize the installed status and versions.
