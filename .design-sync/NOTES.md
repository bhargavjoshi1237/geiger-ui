# design-sync notes — @geiger/ui → Studio

- **Target project**: Studio (`c21b0e79-2b86-4499-a425-20fed327dd33`), `window.GeigerUi` global. The user named it exactly "Studio" (2026-10-10). Two earlier projects were deleted server-side ("Geiger Studio" `dd3dbe67-…`, then "Geiger UI" `11ead9c7-…`); if `get_project` 404s again, ask the user before creating a replacement and confirm the exact name they want.
- **Shape**: `package`, source-only (no `dist/`, no build script). Converter runs synth-entry from `src/index.js`. `.d.ts` are synthesized from plain JSX via tsc, so prop contracts are weak.
- **Conventions header**: `.design-sync/conventions.md` (via `cfg.readmeHeader`) — read by the design agent. Every class/token/component it names must verify against the fresh build each run (grep recipe below); don't rewrite it wholesale.
- **Styling is Tailwind v4** (`@theme inline`, `@custom-variant`, `@apply` in `src/tokens.css`). The package ships NO compiled CSS — apps generate utilities via `@source`. We pre-compile Tailwind against all of `src/` into `.design-sync/tailwind-compiled.css` (`cfg.cssEntry`), otherwise everything renders unstyled.
- **Font**: apps load Geist via `next/font`, so the DS defines `--font-sans: var(--font-geist-sans)` but never the variable itself. We ship Geist + Geist Mono variable woff2 (OFL, from the `geist` npm package) in `.design-sync/fonts/` via `cfg.extraFonts`, and `tw-input.css` defines `--font-geist-sans/mono` on `:root`. Without this every design renders in a system fallback.

## Build setup (source-only JS lib — required every run)
1. **Scratch peer deps**: `.ds-sync/scratch/node_modules` holds react/radix/recharts/sonner/next-themes/input-otp/vaul/react-hook-form/geist/@types/react. `npm i --no-save` in the repo REMOVES peers, so the bundle resolves via `--node-modules ./.ds-sync/scratch/node_modules`. Add any new `package.json` peer/dependency here (`cd .ds-sync/scratch && npm i <pkg>`) — check after every DS dependency change.
2. **@types/react in the repo's own `node_modules/@types/`** — the `.d.ts` parser looks there (not in scratch). Missing → `[DTS_REACT]` and empty `<Name>Props`. A repo `npm i` wipes it: `cp -r .ds-sync/scratch/node_modules/@types/react{,-dom} node_modules/@types/`. Also copy any peer tsc needs (vaul, react-hook-form…) into repo `node_modules`.
3. **Generate .d.ts**: `rm -rf dist/types && node .ds-sync/node_modules/typescript/bin/tsc -p .design-sync/tsconfig.dts.json`, then strip extensions: `find dist/types -name '*.d.ts' -exec sed -i -E 's/(from |import\()"(\.[^"]*)\.(jsx|js)"/\1"\2"/g' {} +`. The tsconfig includes `src/nav/**` too.
4. **`package.json` `types`** must point at `dist/types/index.d.ts` (committed).
5. **Compile Tailwind**: `node .ds-sync/node_modules/@tailwindcss/cli/dist/index.mjs -i .design-sync/tw-input.css -o .design-sync/tailwind-compiled.css` (`tw-input.css` sources `../src/**/*.{js,jsx}`).
6. **Build**: `node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules ./.ds-sync/scratch/node_modules --entry ./src/index.js --out ./ds-bundle` → **236 components**. A full build compiles ~150 previews and takes **15–20 min**, and it `rm -rf`s `ds-bundle/`.

## Orchestration lessons (2026-10-10)
- **Set every `cfg.overrides` entry BEFORE the full build that precedes a fan-out.** Overrides added after the stamped build make `preview-rebuild.mjs` refuse those components with `[CONFIG_STALE]` until another full build — which wipes `ds-bundle/` under running agents (their scoped commands fail with `[NO_MANIFEST]` / missing `_ds_sync.json` until it finishes).
- Recapturing a component can delete its `<Name>.grade.json` when the grade key moves — re-write grades after every recapture.
- Contact sheets get removed by scoped captures; to eyeball floor cards mid-run, serve `ds-bundle` (`.ds-sync/storybook/http-serve.mjs`) and tile iframes (`.ds-sync/tile-iframes.mjs`, wait ≥10s for the 3.6MB bundle per iframe).

## Preview authoring recipe
- `.design-sync/previews/<Name>.tsx`, named exports = cells, no `@dsCard` marker. `import { X } from "@geiger/ui"`, icons from `"lucide-react"`.
- **Light theme on white** by default; show dark with a `className="dark"` wrapper on `var(--background)`.
- Geometry via inline `style` (only utilities the components use exist); colors via `var(--token)`.
- **Compound sub-parts** compose the full parent. **Overlays** render open and need a `cardMode:"single"` + viewport override; wide components get `cardMode:"column"`.
- **Focus on open**: Dialog/Sheet/Drawer/Popover/DatePicker content autofocus their first field → selected text and focus rings in captures. Pass `onOpenAutoFocus={(e) => e.preventDefault()}` on the Content.
- **No open prop**: ContextMenu → dispatch a real `contextmenu` MouseEvent at an element inside `ContextMenuTrigger asChild` in a mount effect. IconPicker → click `[data-slot=icon-picker-trigger]` in an effect. SuiteMegaMenu → focus the trigger. NavVisibilitySettings → click the section toggle. CommandPalette → type via the native value setter + `input` event; seed recents via localStorage (`recentsKey`).
- **Animation**: recharts line/area charts need `isAnimationActive={false}` and XAxis `padding={{left:16,right:16}}`. RollingNumber (also StatsBar/StatGrid/StatTile) previews carry a capture-only `matchMedia` reduced-motion shim (a short `duration` breaks it: values below ~750ms never reveal new digits). The `*Loading` variant previews freeze six frames across the loop with paused negative `animation-delay`s; LogoLoading uses a Web Animations seek. LoadingArea/LoadingScreen pin `name="baton-sweep"`.
- **Charts: recharts ships as two copies** — nest a numeric-size `<ResponsiveContainer>` from the preview's recharts inside `<ChartContainer>`, and use recharts' own `Tooltip`/`Legend` with `ChartTooltipContent`/`ChartLegendContent` as `content`.
- **Dates**: capture freezes the clock at 2024-05-15 and Calendar/Timeline/ActivityCalendar jump to today — build events relative to `new Date()`. Calendar month view only shows events starting at 00:00.
- **Fixed-position components** (SuiteHeader, EventModal, GlobalBanner default): wrap in a sized, transformed frame or use `position="static"`.
- Sidebar* previews share one `Shell` composition inside `SidebarProvider` (explicit height `calc(100vh - 48px)`); the 600px height budget is tight.
- API quick-refs: Badge variants `default|neutral|success|info|warning|danger|purple|outline` (no `secondary`/`destructive` — they silently fall back). `CardAction` anchors only inside `CardHeader`. `Input`/`Textarea`/`SearchInput expanded` are `w-full` → wrap in a width-constrained div. `ExpandableSearch` needs a fixed-width slot. `InlineTitleInput` needs `size={1}` to avoid trailing space. `StatusPill` maps should omit `dotClass` (the apps' `bg-emerald-400` etc. aren't in the CSS).

## Deferred / omitted (and why)
- **Toaster** — `src/ui/sonner.jsx` exports `Toaster` but not `toast`; a preview's `import { toast } from "sonner"` is a second sonner copy whose toasts never reach the DS Toaster, so the card is blank. Ready preview parked at `.design-sync/deferred-previews/Toaster.tsx`; Toaster ships the floor card. **Fix in src**: `export { toast } from "sonner"` — then move the preview back and switch its import to `@geiger/ui`.
- **EventModal `EditEvent` cell omitted** — the edit form's Type `<Select>` renders empty (Radix Select inside `<form>` dispatches `onValueChange('')` before options register). Fix in `calendar.jsx` (ignore empty values / add a placeholder), then restore the cell with a `620x680` viewport.

## Source bugs found (report upstream; not preview issues)
- `Timeline` event pills ignore `type` colour (reads `EVENT_COLORS[type].bg/.text`, entries only have `pill`/`dot`); grid is hard-coded to 14 columns.
- `ChartTooltipContent indicator="dot"`: label and value touch (no gap on the flex row) — add `gap-2`.
- `suite-mega-menu.jsx` uses the typo class `text-foreground0`.
- `Topbar` default `logoSrc="/logo1.svg"` isn't shipped; its default SidebarTrigger throws without `SidebarProvider`.
- `ThemeToggle` can't switch theme in designs — no ThemeProvider is exported (next-themes is bundled internally).
- Light-theme contrast: Calendar event colours, Badge `info`/`purple`, and EventModal's `bg-surface-strong` Save button are tuned for dark.
- DatePicker styles only single selection (range modifiers have no classes).

## The precompiled-utility constraint (affects designs, not just previews)
`_ds_bundle.css` IS `tailwind-compiled.css` — ~1,070 rules, only utilities used in `src/`. Any other class no-ops in real designs. As of 2026-10-10 present: `min-h-screen gap-5 p-8 text-3xl max-w-2xl`; absent: `grid-cols-4 text-5xl bg-emerald-400 bg-sky-400 w-[520px]`. Chart colours are `var(--chart-1..5)` via `ChartContainer` config. Verify a class: `grep -E "\.<class>[,: {]" ds-bundle/_ds_bundle.css`.

## Known render warns (triaged, not failures)
- Floor-card components (sub-parts outside authoring scope, plus Toaster) print `[RENDER_THIN]`/fallback — expected.
- IssueSeverityBadge High/Low show a faint dotted edge — Chromium subpixel AA on `color-mix` borders.
- StatGrid `columns={4}` renders 2x2 in a 900px card (responsive `lg:grid-cols-4`) — correct.

## Re-sync risks
- `tailwind-compiled.css`, `dist/types/`, scratch deps and the repo `@types/react` copy are regenerated/ungitted — a fresh clone redoes Build setup 1–5.
- New DS peers/deps must be added to scratch (2026-10-10 needed vaul, react-hook-form).
- Grades live only in `.design-sync/.cache/review/` and the uploaded `_ds_sync.json`; capture shims (reduced-motion, frame freezes, effect-driven opens) are tied to current component internals — if RollingNumber/LogoLoading/CommandPalette/IconPicker internals change, recheck those previews.
- If `package-capture.mjs` gains `emulateMedia({ reducedMotion })`, drop the RollingNumber shims.
- Playwright 1.60.0 pins chromium build 1223 (installed at `~/AppData/Local/ms-playwright`).
- Component count is the fast integrity check: **236** as of 2026-10-10.
