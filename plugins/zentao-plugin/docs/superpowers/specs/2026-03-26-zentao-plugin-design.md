# ZenTao Plugin Design

**Date:** 2026-03-26

## Goal

Create a single-plugin Cursor repository for ZenTao that mirrors the proven YApi plugin structure: `skill + commands + wrapper scripts`, local CLI reuse, automatic install when the CLI is missing, and a lightweight GitHub Pages site for public docs.

## Architecture

- Keep ZenTao authentication owned by the upstream CLI.
- Wrap `zentao` with local Node scripts so commands see stable JSON instead of raw shell output.
- Expose a small first-release surface: setup, login help, whoami, products, bugs, my bugs, and self-test.
- Reuse the Astro Pages structure from `yapi-plugin`, but rewrite all copy and links for ZenTao.

## Boundaries

- No new MCP layer in v1.
- No second config file or token store.
- No attempt to reimplement ZenTao API logic inside the plugin.

## Error Handling

- `ensure-zentao.mjs` handles missing `node`, `npm`, or `zentao`, plus auto-install failures.
- `run-zentao.mjs` normalizes login failures into `NOT_LOGGED_IN`.
- Commands and skills surface wrapper error codes directly and point users back to `zentao login` when needed.

## Validation

- `npm test`
- `npm run validate`
- `npm run build`

