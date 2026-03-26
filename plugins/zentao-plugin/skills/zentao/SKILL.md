---
name: zentao
description: Query ZenTao products and bugs through the local zentao CLI. Use when the user asks about ZenTao, ChanDao, products, bugs, or local zentao workflows.
---

# ZenTao Skill

Use this skill when the task is clearly about ZenTao or ChanDao.

## Preferred execution path

Always prefer the plugin wrapper scripts over calling `zentao` blindly:

1. Use `node scripts/setup-zentao.mjs` when you need to verify the environment.
2. Use `node scripts/run-zentao.mjs ...` for query operations.
3. Only ask the user to run `zentao login` when setup or a command reports `NOT_LOGGED_IN`.

## What the plugin assumes

- `node` and `npm` are installed locally
- The plugin may install `@leeguoo/zentao-mcp` globally if `zentao` is missing
- Authentication is reused from `~/.config/zentao/config.toml`
- ZenTao server URLs usually include `/zentao`

## Supported workflows

### Setup and login

- Verify ZenTao CLI availability with `node scripts/setup-zentao.mjs`
- If setup reports `NOT_LOGGED_IN`, guide the user to run `zentao login`
- Do not invent a second config format; always reuse `~/.config/zentao/config.toml`

### Query products and bugs

- Inspect login state: `node scripts/run-zentao.mjs whoami`
- List products: `node scripts/run-zentao.mjs products list`
- List bugs for a product: `node scripts/run-zentao.mjs bugs list --product <product_id>`
- Fetch a bug by ID: `node scripts/run-zentao.mjs bug get --id <bug_id>`
- List the current user's bugs: `node scripts/run-zentao.mjs bugs mine --status active --include-details`
- Run a smoke test: `node scripts/run-zentao.mjs self-test`

## Response expectations

- Summarize product or bug tables into readable bullets instead of pasting raw TSV unless the user asked for raw output
- Mention the product ID or bug ID you used when the user asked for a specific item
- Surface wrapper JSON error codes directly when setup or execution fails
- Include the next action when the wrapper returns `nextStep`
