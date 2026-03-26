---
name: cunzhi
description: Work with 寸止 from Cursor. Use when the user asks about Cunzhi, 寸止, 等一下, MCP setup, reference prompts, or the local settings workflow.
---

# Cunzhi Skill

Use this skill when the task is clearly about the `cunzhi` project, the `寸止` MCP server, or the `等一下` settings app.

## Preferred execution path

Always prefer the plugin wrapper scripts over inventing shell commands:

1. Use `node scripts/setup-cunzhi.mjs` when you need to verify the environment.
2. Use `node scripts/run-cunzhi.mjs status` to inspect binary availability and versions.
3. Use `node scripts/run-cunzhi.mjs install-guide` when the machine does not have `寸止` and `等一下`.
4. Use `node scripts/run-cunzhi.mjs open-settings` when the user wants to open the Cunzhi settings window.
5. Use `node scripts/run-cunzhi.mjs mcp-config` or `node scripts/run-cunzhi.mjs prompt-workflow` when the user needs setup snippets.

## What the plugin assumes

- `node` is installed locally
- Cunzhi itself is installed upstream through Homebrew or release archives
- The local binaries are named `寸止` and `等一下`
- This plugin does not replace the upstream setup flow; it only makes that flow easier to reach from Cursor

## Supported workflows

### Setup and installation

- Verify both binaries with `node scripts/setup-cunzhi.mjs`
- If setup reports `CLI_MISSING`, show the install guidance instead of trying to install automatically
- Prefer the upstream install path:
  - macOS: `brew tap imhuso/cunzhi && brew install cunzhi`
  - other platforms: download from GitHub Releases and add both binaries to PATH

### Settings and prompt workflow

- Open the settings UI with `node scripts/run-cunzhi.mjs open-settings`
- Show the MCP config snippet with `node scripts/run-cunzhi.mjs mcp-config`
- Show the prompt workflow with `node scripts/run-cunzhi.mjs prompt-workflow`
- Remind the user that the reference prompt is generated in the `等一下` settings window

## Response expectations

- Keep responses concrete: installed or not installed, which binary is missing, and what to do next
- Surface wrapper JSON error codes directly when setup fails
- Do not claim the plugin can auto-install Cunzhi; it intentionally only guides upstream installation
- When showing setup snippets, preserve the exact `寸止` command name
