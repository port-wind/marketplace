---
name: yapi
description: Query YApi interfaces and run docs-sync workflows through the local yapi CLI. Use when the user mentions YApi, shares a YApi URL, or asks for docs-sync operations.
---

# YApi Skill

Use this skill when the task is clearly about YApi.

## Preferred execution path

Always prefer the plugin wrapper scripts over calling `yapi` blindly:

1. Use `node scripts/setup-yapi.mjs` when you need to verify the environment.
2. Use `node scripts/run-yapi.mjs ...` for query and docs-sync operations.
3. Only ask the user to run `yapi login` when setup or a command reports `NOT_LOGGED_IN`.

## What the plugin assumes

- `node` and `npm` are installed locally
- The plugin may install `@leeguoo/yapi-mcp` globally if `yapi` is missing
- Authentication is reused from `~/.yapi/config.toml`

## Supported workflows

### Setup and login

- Verify YApi CLI availability with `node scripts/setup-yapi.mjs`
- If setup reports `NOT_LOGGED_IN`, guide the user to run `yapi login`
- Do not invent a second config format; always reuse `~/.yapi/config.toml`

### Query interfaces

- Search interfaces: `node scripts/run-yapi.mjs search --q <keyword>`
- Query by ID: `node scripts/run-yapi.mjs --path /api/interface/get --query id=<api_id>`
- List category interfaces: `node scripts/run-yapi.mjs --path /api/interface/list_cat --query catid=<catid>`
- Inspect login state: `node scripts/run-yapi.mjs whoami`

### Docs sync

- Bind docs: `node scripts/run-yapi.mjs docs-sync bind add --name <binding> --dir <path> --project-id <id> --catid <id>`
- Run sync: `node scripts/run-yapi.mjs docs-sync --binding <binding>`

## URL detection

When the user shares a YApi URL:

1. Read `~/.yapi/config.toml` and compare the URL origin with `base_url`
2. If the origin matches, extract:
   - `project_id` from `/project/<id>/...`
   - `api_id` from `/interface/api/<id>`
   - `catid` from `/interface/api/cat_<id>`
3. Use the matching query command instead of manual browser steps

## Response expectations

- Summarize method, path, headers, request schema, and response schema when interface data is returned
- Surface wrapper JSON error codes directly when setup or execution fails
- Include the next action when the wrapper returns `nextStep`
