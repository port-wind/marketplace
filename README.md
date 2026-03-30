# port-wind marketplace

Cursor plugin marketplace repository for `port-wind`.

## Included plugins

- `yapi-plugin`
- `zentao-plugin`
- `cunzhi-plugin`
- `curl-crypto-plugin`

## Structure

- `.cursor-plugin/marketplace.json`: marketplace metadata and plugin registry
- `.claude-plugin/marketplace.json`: Claude Code marketplace metadata and plugin registry
- `plugins/yapi-plugin/`: published plugin source
- `plugins/zentao-plugin/`: published plugin source
- `plugins/cunzhi-plugin/`: published plugin source for Cursor only
- `scripts/validate-template.mjs`: repository validator adapted from the Cursor plugin template

## Validation

```bash
node scripts/validate-template.mjs
```

## Automatic sync

`port-wind/marketplace` is the publishing mirror for Cursor. Source code should continue to live in the individual plugin repositories:

- `leeguooooo/yapi-plugin`
- `leeguooooo/zentao-plugin`
- `leeguooooo/curl-crypto-plugin`

When one of those repositories pushes to `main`, it can trigger the marketplace sync workflow. The workflow:

1. clones the source repository,
2. syncs it into `plugins/<plugin-name>/`,
3. excludes generated and private files such as `node_modules`, `dist`, `.astro`, and `vendor/runtime.dat`,
4. validates the marketplace,
5. commits and pushes the updated snapshot to `main`.

Manual fallback:

```bash
node scripts/sync-plugin.mjs --repo leeguooooo/yapi-plugin --ref main
node scripts/validate-template.mjs
```

Required secret in each source plugin repository:

- `PORT_WIND_MARKETPLACE_TOKEN`: a token that can call `repository_dispatch` on `port-wind/marketplace`

## Claude Code

Add this marketplace in Claude Code with:

```bash
/plugin marketplace add https://github.com/port-wind/marketplace
```
