---
name: cunzhi
description: Work with 寸止 from Cursor. Use when the user asks about Cunzhi, 寸止, 等一下, MCP setup, reference prompts, or the local settings workflow.
---

# Cunzhi Skill

Use this skill when the task is clearly about the `cunzhi` project, the `寸止` MCP server, or the `等一下` settings app.

## Preferred execution path

Do not call plugin-local `node scripts/...` files from the user's project. In Cursor, commands run from the user's current workspace, so relative plugin paths are unreliable.

Always use real binaries and inline snippets instead:

1. Verify binaries with `command -v 寸止` and `command -v 等一下`.
2. Inspect versions with `寸止 --version` and `等一下 --version`.
3. Show installation guidance directly when the binaries are missing.
4. Launch settings with `等一下`.
5. Show MCP config and prompt workflow as static snippets in the response.

## What the plugin assumes

- `node` may be installed locally, but plugin-local scripts are not required at runtime
- Cunzhi itself is installed upstream through Homebrew or release archives
- The local binaries are named `寸止` and `等一下`
- This plugin does not replace the upstream setup flow; it only makes that flow easier to reach from Cursor

## Supported workflows

### Setup and installation

- Verify both binaries with:
  - `command -v 寸止 >/dev/null && echo "寸止: 已安装" || echo "寸止: 未安装"`
  - `command -v 等一下 >/dev/null && echo "等一下: 已安装" || echo "等一下: 未安装"`
- If either binary is missing, show install guidance instead of trying to install automatically
- Prefer the upstream install path:
  - macOS: `brew tap imhuso/cunzhi && brew install cunzhi`
  - other platforms: download from GitHub Releases and add both binaries to PATH

### Settings and prompt workflow

- Open the settings UI with `等一下`
- Show the MCP config snippet directly:
  - `{"mcpServers":{"寸止":{"command":"寸止"}}}`
- Remind the user that the reference prompt is generated in the `等一下` settings window

## Response expectations

- Keep responses concrete: installed or not installed, which binary is missing, and what to do next
- Do not instruct the model to run plugin-relative files from the current workspace
- Do not claim the plugin can auto-install Cunzhi; it intentionally only guides upstream installation
- When showing setup snippets, preserve the exact `寸止` command name
