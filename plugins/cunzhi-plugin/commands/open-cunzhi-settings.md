---
name: open-cunzhi-settings
description: Launch the upstream 等一下 settings window from Cursor.
---

# Open Cunzhi Settings

1. Run `node scripts/run-cunzhi.mjs open-settings`.
2. Parse the returned JSON.
3. If successful, tell the user that the settings window was launched and remind them to review MCP tools plus the generated reference prompt there.
4. If the wrapper reports `CLI_MISSING`, tell the user to install Cunzhi first.
