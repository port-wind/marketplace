# cunzhi-plugin

Cursor plugin for Cunzhi workflows.

It wraps the upstream `寸止` and `等一下` binaries so you can stay inside Cursor while checking installation status, opening the settings app, and keeping the MCP plus prompt workflow close at hand. The plugin does not replace the upstream project or invent a second install flow.

## What it does

- Verify whether `寸止` and `等一下` are available locally
- Show upstream installation guidance when the binaries are missing
- Launch the `等一下` settings window from Cursor
- Show the MCP client config snippet for `寸止`
- Explain the reference prompt workflow that Cunzhi generates in its settings UI

## Why this plugin

- Keeps the upstream Cunzhi product intact instead of forking its setup flow
- Makes the install, status, and settings steps reachable from Cursor
- Gives agents a stable command surface instead of ad-hoc shell instructions
- Starts simple with `skill + commands + wrapper scripts`

## Layout

- `.cursor-plugin/plugin.json`: marketplace metadata
- `skills/cunzhi/SKILL.md`: routing, install guidance, and settings workflow rules
- `commands/`: setup, install, status, settings, MCP config, and prompt workflow commands
- `scripts/`: local Node wrappers for Cunzhi detection and settings launch

## Local development

```bash
npm test
npm run validate
npm run dev
npm run build
```

## Runtime assumptions

- `node` is available locally
- Cunzhi itself is installed upstream through Homebrew or release archives
- The local binaries are named `寸止` and `等一下`

## GitHub Pages

The repository includes a lightweight Astro site for GitHub Pages:

- homepage: plugin overview and installation entry point
- docs area: setup, commands, and development notes

Once the Pages workflow is running on `main`, the site publishes at:

- `https://leeguooooo.github.io/cunzhi-plugin/`
