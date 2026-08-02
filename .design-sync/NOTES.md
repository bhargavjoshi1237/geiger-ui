# design-sync notes — @geiger/ui → Geiger UI

- **Target project**: Geiger UI (`11ead9c7-ea72-4053-b753-037493d20323`), `window.GeigerUi` global.
  - The previous project ("Geiger Studio", `dd3dbe67-…`) was **deleted server-side** — `get_project` 404s. The 2026-07-29 run created a fresh project and re-keyed the global from `GeigerFlow` → `GeigerUi` (no preview hardcodes the global; they all import from `"@geiger/ui"` and the build rewrites it, so a re-key is free).
  - Because the old project is gone, there is **no remote `_ds_sync.json` anchor** to carry verification forward. Local grades in `.design-sync/.cache/review/` are the only carry-forward on this machine.
- **Shape**: `package`, source-only (no `dist/`, no build script). Converter runs synth-entry from `src/index.js`. `.d.ts` are synthesized/weak because the library is plain JSX, not TS.
- **Conventions header**: `.design-sync/conventions.md`, wired via `cfg.readmeHeader`. It is prepended to the generated README and read by the design agent. Validate its named classes/tokens/components against the fresh build every run; don't rewrite it wholesale.
- **Styling is Tailwind v4** (`@theme inline`, `@custom-variant`, `@apply` in `src/tokens.css`). The package ships NO compiled CSS — consuming apps generate utilities via `@source` scanning. So we pre-compile Tailwind against `src/ui` into `.design-sync/tailwind-compiled.css` and point `cfg.cssEntry` at it, otherwise every preview renders unstyled.
- **Prior sync shipped floor cards only** — no authored previews existed. This run authors previews for the whole library.
- **Delta vs the uploaded build**: new `Topbar` component (added to the barrel in the working tree, uncommitted). Bundle/.d.ts/.prompt.md otherwise rebuild ~identical.

## Build setup (source-only JS lib — required every run)
1. **Scratch peer deps**: `.ds-sync/scratch/node_modules` holds react/radix/recharts/sonner/next-themes/input-otp/etc. The repo ships no deps (peers only) and `npm i --no-save` in the repo REMOVES them (no `dependencies` in package.json), so the bundle resolves peers via `--node-modules ./.ds-sync/scratch/node_modules`. Also `cp -r`'d recharts/sonner/next-themes/input-otp + @types into repo `node_modules` so tsc resolves.
2. **Generate .d.ts** (discovery needs a types tree — plain JSX has none): `node .ds-sync/node_modules/typescript/bin/tsc -p .design-sync/tsconfig.dts.json` → `dist/types/`. Then strip `.jsx`/`.js` extensions from the emitted specifiers so ts-morph resolves the re-exports: `find dist/types -name '*.d.ts' -exec sed -i -E 's/(from |import\()"(\.[^"]*)\.(jsx|js)"/\1"\2"/g' {} +`.
3. **`package.json` `types` field** must point at `dist/types/index.d.ts` — without it the converter looks for the types entry at the package root and finds 0 exports. (Added to the working tree.)
4. **Compile Tailwind** → `.design-sync/tailwind-compiled.css` (cfg.cssEntry) via `node .ds-sync/node_modules/@tailwindcss/cli/dist/index.mjs -i .design-sync/tw-input.css -o .design-sync/tailwind-compiled.css` (needs the `.design-sync/node_modules` symlink → `.ds-sync/node_modules` for `tailwindcss` resolution).
5. **Build**: `node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules ./.ds-sync/scratch/node_modules --entry ./src/index.js --out ./ds-bundle` → 165 components.

## Preview authoring recipe (calibrated on Button/Card/Badge/Switch — all render styled)
- Author `.design-sync/previews/<Name>.tsx`, named exports = cells, NO `@dsCard` marker.
- `import { X } from "@geiger/ui";` (→ window.GeigerFlow) and icons `import { Plus } from "lucide-react";` (bundled from scratch node_modules — both resolve).
- **Light theme on white** — components use `:root` tokens by default; that's the DS default and matches the prior cards. Don't wrap in `.dark`.
- Layout glue via inline `style={{display:'flex',gap:12,...}}`; token colors in prose via `color:'var(--muted-foreground)'` etc.
- 2–6 exports each; sweep the primary variant axis; add states (disabled/loading/open).
- **Compound sub-parts** (CardHeader, DialogTitle, TableCell, SidebarMenuButton…): compose the FULL parent so the part shows in context.
- **Overlays** (Dialog/DropdownMenu/Popover/Tooltip/HoverCard/Sheet/ContextMenu/Select): render the OPEN state (`open`/`defaultOpen`), and they need `cfg.overrides.<Name>: {"cardMode":"single","viewport":"WxH"}` (orchestrator-applied) so the portal content stays in the card.
- Rebuild scoped: `node .ds-sync/lib/preview-rebuild.mjs --config .design-sync/config.json --node-modules ./.ds-sync/scratch/node_modules --out ./ds-bundle --components A,B`; capture: `node .ds-sync/package-capture.mjs --out ./ds-bundle --components A,B`.

## Folded wave learnings
- **Arbitrary Tailwind classes no-op in previews** — `tailwind-compiled.css` only carries utilities scanned from `src/ui`, so a preview using `w-[520px]`/`h-[260px]` gets nothing. Size/layout in previews MUST use inline `style={{width,height,...}}`. (Standard utilities that appear in `src/ui` do work.)
- **Charts: recharts ships as two copies** (copy A in `_ds_bundle.js` via `@geiger/ui`; copy B from a preview's own `import "recharts"`). A copy-B `<BarChart>` reads copy-B context and mounts 0×0 → blank. Fix (used in all chart previews): nest a numeric-size `<ResponsiveContainer width={N} height={N}>` from the preview's recharts inside `<ChartContainer>`, and wire tooltips/legends with recharts' OWN `Tooltip`/`Legend` + `ChartTooltipContent`/`ChartLegendContent` as `content` (`defaultIndex` forces tooltip open). `ChartContainer` still supplies the config/colour context across the boundary.
- API quick-refs: `CardAction` only anchors top-right INSIDE `CardHeader`; `Input`/`Textarea` are `w-full` → wrap in a width-constrained div; `Separator orientation="vertical"` needs a fixed-height flex row; `ScrollArea` renders its own `ScrollBar` (children go in the viewport); Radix scrollbar thumb only paints on hover (clipped overflow is the static cue).

## The precompiled-utility constraint (matters to the design agent, not just previews)
`_ds_bundle.css` IS `tailwind-compiled.css` — ~580 utilities, only those scanned from `src/ui`.
Rendered designs receive nothing else, so **any class outside that set silently no-ops in real
designs too**, not just in previews. Confirmed absent: `min-h-screen`, `gap-5`, `p-8`, `text-3xl`,
and every arbitrary value (`w-[520px]`). Also absent: `text-chart-*` / `bg-chart-*` — chart series
colors are `var(--chart-1..5)` passed through `ChartContainer`'s `config`, which re-exposes them as
`var(--color-<key>)`. Verify any class before naming it in conventions.md:
`grep -E "^\s*\.<class>[,: {]" ds-bundle/_ds_bundle.css` (utilities are nested in `@layer`, so an
`^\.` anchor gives false negatives).

## 2026-07-29 run — render verification was skipped
- Playwright's chromium was **not cached on this machine** (`~/AppData/Local/ms-playwright` absent)
  and the user declined the ~200MB install. Consequences, both expected:
  - `package-validate.mjs` was run with `--no-render-check` → `[RENDER_SKIPPED]`, no
    `.render-check.json`, and `report_validate` was **skipped** rather than fed invented counts.
  - `resync.mjs` exits **1 with only the capture stage failing** (build/diff/validate all ok). That
    specific failure shape means "no browser", not "broken bundle" — check
    `ds-bundle/.resync-verdict.json` `stages` before chasing it.
- No new previews were authored this run (user deferred): 44 authored / 43 graded good carried
  forward, 123 components ship the floor card. `Dialog` has an authored preview but has **never been
  graded** — grade it first when a browser is next available.
- Playwright 1.60.0 (in `.ds-sync/node_modules`) pins chromium build **1223**; install that pair.

## Re-sync risks
- `tailwind-compiled.css` is a generated artifact regenerated from `src/` on each run; if Tailwind v4 or tokens.css change, recompile before building.
- The `@geiger/ui` working tree has uncommitted changes — as of 2026-07-29: `src/ui/topbar.jsx`
  (modified), `src/index.js` (adds the command-palette export), and **untracked**
  `src/ui/command-palette.jsx`. The synced build reflects the working tree, not a committed tag; if
  those files are ever reverted or lost, `CommandPalette` and the expanded `Topbar` vanish from the
  next build (167 components → 165).
- `dist/types/` is regenerated per run (`tsc` + the extension-stripping `sed`) and is NOT committed —
  a fresh clone must re-run build setup steps 1–4 before the converter.
- Component count is the fast integrity check: **167** as of this run.
