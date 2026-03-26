# port-wind marketplace

Cursor plugin marketplace repository for `port-wind`.

## Included plugins

- `yapi-plugin`
- `zentao-plugin`
- `cunzhi-plugin`

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

## Claude Code

Add this marketplace in Claude Code with:

```bash
/plugin marketplace add https://github.com/port-wind/marketplace
```
