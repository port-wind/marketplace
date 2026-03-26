# Development

## Local commands

- `npm test`
- `npm run validate`
- `npm run build`

## Script entrypoints

- `node scripts/ensure-zentao.mjs`
- `node scripts/setup-zentao.mjs`
- `node scripts/run-zentao.mjs whoami`
- `node scripts/run-zentao.mjs products list`
- `node scripts/run-zentao.mjs bugs mine --status active --include-details`

## Notes

- Wrapper scripts print JSON so command prompts can reason about stable fields
- Authentication remains owned by the upstream `zentao login` flow
- The auto-install step uses `npm install -g @leeguoo/zentao-mcp`
