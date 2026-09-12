# Retiring the products' local components/ui

**Date:** 2026-09-12
**Status:** Implemented
**Scope:** 6 Geiger web apps + `@geiger/ui`
**Follows:** `2026-09-12-loading-states-sweep-design.md`

## Problem

Six products carried their own `components/ui` directory — 124 files — shadowing
components `@geiger/ui` already shipped. Every one was an older generation of the
same component: original shadcn `forwardRef` bodies against the kit's newer
`data-slot` ones, raw shadcn tokens against the kit's semantic ones.

The copies were stale, not deliberate forks. Export surfaces matched — even
`geiger-property/sidebar`, whose 572 lines of internal drift still exposed the
same 21 names. So the products were not customising anything; they were frozen at
whatever shadcn emitted when each app was scaffolded.

## Decision

`@geiger/ui` wins everywhere. No local variant is backported into an existing kit
component. Where a product's screen looked different, that difference was drift,
and losing it is the point — the kit's version is the better one.

## Classification

Every local file fell into one of four buckets:

| Tier | Files | Meaning | Action |
| --- | --- | --- | --- |
| DEAD | 41 | nothing outside `components/ui` imported it | delete |
| TRIVIAL | 59 | ≤20 lines of semantic drift, usually just the `cn` import path | repoint, delete |
| REVIEW | 18 | real internal drift, identical exports | repoint, delete |
| ORPHAN | 6 | no kit counterpart | promote to the kit |

"Semantic drift" ignores comments, blank lines, the `cn`/radix import paths and
`Slot` vs `Slot.Root`. Measuring it mattered: raw `diff` reported
`geiger-dash/calendar` at 3277 changed lines and `chart` at 624, but almost all
of that was CRLF and formatting noise — the real figures were 264 and 2. Without
normalising, 18 files needing judgement would have looked like 40.

`geiger-assets` was the extreme case: all 30 of its local files were dead. An
earlier count credited it with 8 importers, but those were the ui files importing
*each other*, which does not keep a directory alive.

## Orphans promoted

| Component | From | Importers | Notes |
| --- | --- | --- | --- |
| `ResizeHandle` → `resize-handle.jsx` | geiger-dash | 24 | byte-identical in dash and notes; converted from default to a named export to match the kit |
| `drawer.jsx` | geiger-dash | 1 | needs `vaul` |
| `form.jsx` | geiger-notes | 0 | needs `react-hook-form` |
| `file-input.jsx` | geiger-forms | 1 | no new dependency |

`vaul` and `react-hook-form` joined the kit's optional `peerDependencies`.

## Import rewriting

701 statements were repointed at `@geiger/ui` — 614 in the first pass across 258
files, plus 87 more in a second pass across 16 geiger-dash files (see
*What verification caught* below).

Statements are **merged into one per file** rather than rewritten in place. A file
importing `Button` from `@geiger/ui` and `Card` from `@/components/ui/card` is
fine either way, but one importing `Button` from *both* would end up with a
duplicate binding — a SyntaxError. Merging removes the whole class of problem.
Subpath imports (`@geiger/ui/button`) are left alone, and any name they bind is
excluded from the merge so the two cannot collide.

Default imports needed mapping, since the kit exports these as named:
`ResizeHandle`, `Footer`, `Logo`, `ThemeToggle`. Re-export statements
(`export { default } from …`) were rewritten in place rather than merged.

## Peer dependencies

Promoting `form` and `drawer` into the barrel has a cost worth recording: `index.js`
re-exports every component eagerly, so any app importing anything from
`@geiger/ui` pulls `form.jsx` and `drawer.jsx` into its module graph and needs
their peers resolvable. Optional `peerDependencies` do not help with that.

`vaul` and `react-hook-form` were therefore installed in all ten apps, matching
how `recharts` is already handled suite-wide. Three apps also turned out to be
missing barrel peers that predate this work: `input-otp` (dash, content, forms),
`react-day-picker` (content, forms) and `sonner` (forms). Those were installed
too — content and forms had been getting away with it only because they import
almost entirely through subpaths, which never load the barrel.

## Pre-existing defects found

Two bugs this work surfaced rather than caused:

1. **`geiger-dash` imported `vaul` without depending on it.**
   `components/ui/drawer.jsx` imported `vaul`, which was not in dash's
   `package.json` and not resolvable. It never broke the build because
   `notes-playground/internal/layout/UserDrawer.jsx` — its only importer — is not
   reachable from any route. `vaul` is now a real dependency.

2. **`geiger-notes/components/internal/nodes/image-node/ResizeHandle.jsx` did not
   parse.** Below its re-export line sat a stray copy of the component body with
   no enclosing function — a top-level `return (…)`, then `};`, then
   `export default ResizeHandle;`. It survived because nothing imports it. It is
   now the one-line re-export its own comment says it is.

## Result

No product has a `components/ui` directory. The kit holds 56 components exporting
265 names; 6129 import bindings across 1257 barrel statements in the ten apps
resolve against it.

| Repo | Statements repointed | Local files deleted |
| --- | --- | --- |
| geiger-dash | 470 | 38 |
| geiger-property | 118 | 29 |
| geiger-notes | 106 | 25 |
| geiger-assets | 0 | 30 |
| geiger-campaign | 6 | 1 |
| geiger-forms | 1 | 1 |

Statement counts are exact. File counts are given per pass rather than per repo
because the two passes overlap unpredictably in geiger-dash, and a union figure
cannot be recovered after the fact.

## What verification caught that review did not

The first transformer pass matched only **double-quoted** module strings. geiger-dash
uses single quotes widely, so 87 statements across 16 files were silently skipped —
and because the same double-quote assumption was baked into the "no references
remain" check, that check reported clean. The directories were already deleted by
then. `next build` caught it: 87 unresolved modules, exactly the skipped set.

The lesson is narrow and worth keeping: a verification query that shares an
assumption with the transform it checks cannot fail independently of it. The build
was the only check with no shared assumption, and it was the one that found the bug.

## Verification

- 1329 files parse clean across the six migrated repos (catches duplicate bindings).
- 6129 `@geiger/ui` import bindings checked against the kit's real export surface
  — zero unresolved.
- Zero references to any local `components/ui` remain, both quote styles.
- `next build` green on all ten apps.

## Risks

- **Visual shift is expected and intended** on screens using the 18 REVIEW
  components — cards, dialogs, selects, badges and sidebars in dash, property and
  notes. Nothing functional changes; the exports are identical.
- **The barrel is now dependency-heavy.** Every app carries `vaul` and
  `react-hook-form` for two components most do not use. If that becomes a
  problem, the fix is to drop `form` and `drawer` from `index.js` and let them be
  imported by subpath only.
