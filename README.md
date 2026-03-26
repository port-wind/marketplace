# port-wind marketplace

Cursor plugin marketplace repository for `port-wind`.

## Included plugins

- `yapi-plugin`
- `zentao-plugin`

## Structure

- `.cursor-plugin/marketplace.json`: marketplace metadata and plugin registry
- `plugins/yapi-plugin/`: published plugin source
- `plugins/zentao-plugin/`: published plugin source
- `scripts/validate-template.mjs`: repository validator adapted from the Cursor plugin template

## Validation

```bash
node scripts/validate-template.mjs
```
