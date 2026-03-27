---
name: zentao
description: Query ZenTao products and bugs through the local zentao CLI. Use when the user asks about ZenTao, ChanDao, products, bugs, or local zentao workflows.
---

# ZenTao Skill

Use this skill when the task is clearly about ZenTao or ChanDao.

## Preferred execution path

Do not call plugin-local `node scripts/...` files from the user's project. In Cursor, commands run from the user's current workspace, so relative plugin paths are unreliable.

Always use the real `zentao` CLI directly:

1. Check whether `zentao` exists with `command -v zentao`.
2. If `zentao` is missing and the user wants setup, install `@leeguoo/zentao-mcp` with `npm install -g @leeguoo/zentao-mcp`.
3. Use direct `zentao ...` commands for product and bug workflows.
4. Only ask the user to run `zentao login` when `whoami` or another command shows a login/config problem.

## What the plugin assumes

- `node` and `npm` are installed locally
- The plugin may install `@leeguoo/zentao-mcp` globally if `zentao` is missing
- Authentication is reused from `~/.config/zentao/config.toml`
- ZenTao server URLs usually include `/zentao`

## Supported workflows

### Setup and login

- Verify ZenTao CLI availability with `command -v zentao`
- If missing, install with `npm install -g @leeguoo/zentao-mcp`
- Check login state with `zentao whoami`
- If setup reports a login problem, guide the user to run `zentao login`
- Do not invent a second config format; always reuse `~/.config/zentao/config.toml`

### Query products and bugs

- Inspect login state: `zentao whoami`
- List products: `zentao products list`
- List bugs for a product: `zentao bugs list --product <product_id>`
- Fetch a bug by ID: `zentao bug get --id <bug_id>`
- List the current user's bugs: `zentao bugs mine --status active --include-details`
- Run a smoke test: `zentao self-test`

## Response expectations

- Summarize product or bug tables into readable bullets instead of pasting raw TSV unless the user asked for raw output
- Mention the product ID or bug ID you used when the user asked for a specific item
- If a direct CLI command fails, surface stderr and suggest the next step
- Do not instruct the model to run plugin-relative files from the current workspace
