# ZenTao Plugin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish `zentao-plugin` as a publishable Cursor plugin and then add it into the `port-wind/marketplace` repo.

**Architecture:** Reuse the `yapi-plugin` repository shape, swap the behavior to ZenTao-specific wrappers and commands, and keep Pages/docs aligned with the plugin manifest. Then sync the finished plugin into the marketplace repo as a second plugin entry.

**Tech Stack:** Cursor plugin manifests, Node.js wrapper scripts, Astro, GitHub Pages

---

### Task 1: Finish plugin manifests and command surface

**Files:**
- Modify: `.cursor-plugin/plugin.json`
- Modify: `package.json`
- Modify: `README.md`
- Modify: `commands/login-zentao.md`
- Modify: `commands/setup-zentao.md`
- Modify: `commands/whoami-zentao.md`
- Create: `commands/list-products.md`
- Create: `commands/list-bugs.md`
- Create: `commands/get-bug-by-id.md`
- Create: `commands/list-my-bugs.md`
- Create: `commands/self-test-zentao.md`

- [ ] Verify manifest names, descriptions, and keywords match ZenTao.
- [ ] Replace remaining YApi command instructions with ZenTao wrapper commands.
- [ ] Add the missing product, bug, and self-test command files.

### Task 2: Rewrite skill and documentation

**Files:**
- Modify: `skills/zentao/SKILL.md`
- Modify: `docs/usage.md`
- Modify: `docs/development.md`
- Modify: `docs/marketplace-submission.md`
- Create: `docs/superpowers/specs/2026-03-26-zentao-plugin-design.md`
- Create: `docs/superpowers/plans/2026-03-26-zentao-plugin.md`

- [ ] Replace the YApi skill body with ZenTao command-routing guidance.
- [ ] Rewrite public docs to match the supported ZenTao workflows.
- [ ] Save the concise design and plan documents in-repo.

### Task 3: Rewrite the Pages site

**Files:**
- Modify: `src/layouts/SiteLayout.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/docs/index.astro`
- Modify: `src/pages/docs/getting-started.astro`
- Modify: `src/pages/docs/commands.astro`
- Modify: `src/pages/docs/development.astro`

- [ ] Replace YApi branding, descriptions, and repo links with ZenTao equivalents.
- [ ] Update workflow lists and examples to match products, bugs, and self-test.
- [ ] Keep the existing layout and styling unless branding-specific copy must change.

### Task 4: Validate, publish, and sync into marketplace

**Files:**
- Modify: `.cursor-plugin/marketplace.json` in `port-wind/marketplace`
- Create/Sync: `plugins/zentao-plugin/**` in `port-wind/marketplace`

- [ ] Run `npm test`, `npm run validate`, and `npm run build` in `zentao-plugin`.
- [ ] Commit and push `zentao-plugin`.
- [ ] Copy the finished plugin into `port-wind/marketplace/plugins/zentao-plugin`.
- [ ] Register `zentao-plugin` in marketplace metadata, validate the marketplace repo, and push.
