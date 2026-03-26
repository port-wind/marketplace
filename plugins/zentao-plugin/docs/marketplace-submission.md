# Marketplace Submission

## Plugin name

`ZenTao`

## Repository

- GitHub: [https://github.com/leeguooooo/zentao-plugin](https://github.com/leeguooooo/zentao-plugin)
- Plugin slug: `/add-plugin zentao-plugin`

## Short description

Use ZenTao from Cursor through the local zentao CLI. Install it automatically, reuse existing login state, inspect products and bugs, and run self-test workflows.

## Expanded description

ZenTao brings the existing `zentao` CLI into Cursor with a cleaner workflow for both users and agents. It checks whether the local CLI is available, installs `@leeguoo/zentao-mcp` automatically when needed, reuses the existing `~/.config/zentao/config.toml` login state, and exposes the most common product and bug tasks through a dedicated skill and focused commands.

The first release is intentionally narrow: setup, login assistance, product listing, bug lookup, "my bugs", and `self-test`. That keeps the plugin easy to understand while covering the highest-value ZenTao flows developers already use.

## Key workflows

- Verify environment and auto-install the ZenTao CLI
- Reuse existing `zentao login` state instead of adding a second auth flow
- List products
- Fetch bug details by numeric ID
- List bugs under a product
- Run `self-test`

## User requirements

- Local `node`
- Local `npm`
- Permission to run `npm install -g`
- ZenTao credentials configured through `zentao login`

## Included components

- Skills: 1
- Commands: 8
- MCP: none
- Hooks: none

## Verification summary

- `npm test`
- `npm run validate`
- `npm run build`

## Notes for submission

- The plugin is a single-plugin repository derived from the official Cursor template
- The current logo is a committed SVG asset at `assets/logo.svg`
- The source repository is public and ready for Cursor review
