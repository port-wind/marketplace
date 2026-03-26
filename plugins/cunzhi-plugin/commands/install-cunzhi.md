---
name: install-cunzhi
description: Show the upstream Cunzhi installation guidance without attempting automatic installation.
---

# Install Cunzhi

1. Run `node scripts/run-cunzhi.mjs install-guide`.
2. Parse the returned JSON.
3. Present the recommended macOS Homebrew command exactly as returned.
4. Also surface the release URL and the manual installation note for other platforms.
5. Remind the user that both `寸止` and `等一下` must be on PATH before Cursor can use the plugin workflows.
