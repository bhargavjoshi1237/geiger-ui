# design-sync notes — @geiger/ui → Geiger Studio

- **Target project**: Geiger Studio (`dd3dbe67-2e02-4f2c-b93b-a9abf4b1a8e2`), `window.GeigerFlow` global (kept from the prior sync to avoid a full re-key).
- **Shape**: `package`, source-only (no `dist/`, no build script). Converter runs synth-entry from `src/index.js`. `.d.ts` are synthesized/weak because the library is plain JSX, not TS.
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

## Re-sync risks
- `tailwind-compiled.css` is a generated artifact regenerated from `src/` on each run; if Tailwind v4 or tokens.css change, recompile before building.
- The `@geiger/ui` working tree has uncommitted changes (topbar.jsx, index.js) — the synced build reflects the working tree, not a committed tag.
