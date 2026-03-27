# zentao-plugin

Cursor and Claude Code plugin for ZenTao workflows.

It wraps the existing `zentao` CLI so you can work with ZenTao without leaving the editor. The plugin checks whether `zentao` is installed, installs `@leeguoo/zentao-mcp` automatically when needed, reuses your existing `~/.config/zentao/config.toml`, and exposes high-value product and bug workflows as Cursor skills and commands.

## What it does

- Detect and install `@leeguoo/zentao-mcp` automatically when `zentao` is missing
- Reuse `~/.config/zentao/config.toml` and existing `zentao login` state
- Verify the current account with `zentao whoami`
- List products
- List bugs for a product
- Fetch bug details by ID
- List your own bugs
- Run `zentao self-test`

## Why this plugin

- Avoids re-entering ZenTao credentials in a second tool
- Keeps bug lookup and product inspection inside Cursor
- Gives agents a stable command surface instead of ad-hoc shell instructions
- Starts simple with `skill + commands + wrapper scripts`, without forcing MCP on day one

## Layout

- `.cursor-plugin/plugin.json`: marketplace metadata
- `.claude-plugin/plugin.json`: Claude Code plugin metadata
- `skills/zentao/SKILL.md`: ZenTao routing, command selection, and login guidance
- `commands/`: setup, login, product, bug, and self-test command prompts
- `scripts/`: local Node wrappers around the `zentao` CLI

## Local development

```bash
npm test
npm run validate
npm run dev
npm run build
```

## Runtime assumptions

- `node` and `npm` are available locally
- global npm install is permitted
- ZenTao authentication is still managed by `zentao login`
- ZenTao base URLs usually include `/zentao`

## GitHub Pages

The repository includes a lightweight Astro site for GitHub Pages:

- homepage: product overview and installation entry point
- docs area: setup, commands, and development notes

Once the Pages workflow is running on `main`, the site publishes at:

- `https://leeguooooo.github.io/zentao-plugin/`
