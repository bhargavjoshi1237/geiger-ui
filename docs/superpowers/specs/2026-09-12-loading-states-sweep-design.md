# Loading-state sweep across the Geiger suite

**Date:** 2026-09-12
**Status:** Approved design, ready for planning
**Scope:** 10 Geiger web apps + `@geiger/ui`

## Problem

Block-level loading states are hand-rolled at ~192 sites across the suite. They
take three incompatible forms:

1. Bare text — `<div className="py-16 text-center text-sm">Loading…</div>`
2. Lucide `Loader2` + `animate-spin` + a text label
3. `LogoLoading` (the house animated mark) — already used at 134 sites, but with
   drifting sizes (40, 48, 56, 64, 72, 80) and an inconsistent trailing label

`geiger-ui` already ships `LogoLoading` (`src/ui/logo-loading.jsx`, 19 weighted
variants, exported from `src/index.js`). The component is not the gap. The gap is
that every call site rebuilds the *container* around it, and that a third of the
suite still shows a generic spinner or plain text instead of the house mark.

`geiger-events` is the furthest-along product and is the reference for **which
size goes where** — but it is *not* a reference for markup: 58 of its own block
loaders are still `Loader2` + `Loading…`. Those get fixed by this work, not copied.

## Goals

- One house loading animation for every block-level loading state in every app.
- Two ready-to-use primitives in `@geiger/ui` so no app rebuilds the container.
- No visible "Loading…" text in block loaders; the meaning survives as an
  accessible label.
- Consistent sizing, derived from the `geiger-events` convention.

## Non-goals

- `Skeleton` components (361 usages). Skeletons preview layout shape, which a
  centered mark cannot do. They stay.
- In-button and inline spinners. `logo-loading.jsx` explicitly prescribes keeping
  the Lucide spinner there; the mark is illegible at 16px.
- `geiger-events/mobile/` — React Native, cannot consume geiger-ui web components.
- `geiger-comms-widget` — standalone embeddable bundle, does not depend on geiger-ui.
- The `@/components/ui` → `@geiger/ui` import migration. Separate spec.

## Design

### New primitives in `src/ui/screen-kit.jsx`

Siblings to the existing `EmptyState`, reusing its container grammar
(`flex h-full items-center justify-center px-6 py-16`).

```jsx
export function LoadingArea({
  size = 40,
  name,              // pin a LogoLoading variant; omit for weighted-random
  panel = false,     // bordered card shell
  label = "Loading", // becomes LogoLoading's aria-label
  className,
})

export function LoadingScreen({
  size = 80,
  name,
  label = "Loading",
  className,
})
```

`LoadingArea` renders a centered `LogoLoading` and nothing else. With `panel`, it
adds `rounded-xl border border-border bg-surface-subtle` — the shape geiger-comms
uses at 44 sites.

`LoadingScreen` is the full-viewport form: `min-h-screen`, larger mark, used by
route-level `loading.js`, public pages, and workspace/project gate states.

Both are exported from `src/index.js` via the existing
`export * from "./ui/screen-kit.jsx"`, so no new export line is needed.

### Sizing rule

Derived from `geiger-events` usage (63 sites at 40, 5 at 80):

| Context | Component | Size |
| --- | --- | --- |
| Section, table, panel, dialog body | `LoadingArea` | 40 |
| Bordered sub-panel | `LoadingArea panel` | 40 |
| Workspace/project gate, route `loading.js`, public page | `LoadingScreen` | 80 |

This replaces the current drift: comms/campaign/content gates at 56–72, dash at
40/48/56/64, assets at 48/80.

### Accessible label

Visible text is removed. Where a call site named what was loading
(`"Loading campaigns…"`), that string is passed through as
`label="Loading campaigns"` and reaches `LogoLoading`'s existing
`role="status" aria-label={...}`. Screen-reader users keep the specific context;
sighted users see only the mark. Generic `"Loading…"` sites take the default.

### Replacement criteria

A site is **in scope** when it is one of:

- A centered block container whose only content is a spinner and/or loading text
- A bordered panel loader (`rounded-xl border … px-6 py-16` + spinner)
- A route-level `loading.js` / `loading.jsx`
- A `Suspense fallback` rendering a spinner or loading text
- A workspace/project gate state (`LoadingArea` / `LoadingState` in app code)
- A bare text-only `Loading…` block

A site is **out of scope** when it is one of:

- A spinner inside `<Button>`
- A spinner sharing a text row inline
- Sized `h-3 w-3` or `h-3.5 w-3.5`
- A label swap such as `{busy ? "Uploading…" : "Upload an image"}`
- `sr-only` text inside a `Skeleton`
- Any `Skeleton`

### App-local loading components

Seven apps define their own loading wrapper. These become thin wrappers over the
geiger-ui primitive rather than being deleted, so every call site that references
them keeps working:

| File | Becomes |
| --- | --- |
| `geiger-campaign/components/internal/workspace/workspace_states.jsx` `LoadingArea` | `LoadingScreen` |
| `geiger-comms/components/internal/workspace/workspace_states.jsx` `LoadingArea` | `LoadingScreen` |
| `geiger-content/components/internal/workspace/workspace_states.jsx` `LoadingArea` | `LoadingScreen` |
| `geiger-events/components/internal/workspace/workspace_states.jsx` `LoadingArea` | `LoadingScreen` |
| `geiger-property/components/internal/shared/project_states.jsx` `LoadingArea` | `LoadingScreen` |
| `geiger-comms/components/widget/widget_primitives.jsx` `LoadingState` | `LoadingArea` (stops rendering `label` as text) |
| `geiger-forms/components/internal/screens/forms/screen-shell.jsx` `LoadingState` | `LoadingArea` (stops rendering `label` as text) |

Name collision: the app-local `LoadingArea` wrappers share a name with the new
geiger-ui export. Each wrapper file imports the primitive as `LoadingScreen`, so
there is no clash — but app files that import both must not wildcard-import.

### Distribution

All 10 apps pin `@geiger/ui` to `github:bhargavjoshi1237/geiger-ui#3e39407`.
The new primitives require:

1. Commit + push the `screen-kit.jsx` change to `origin/master`.
2. Bump the `#<sha>` pin in all 10 `package.json` files to the new commit.
3. `npm install` per app.

App-side edits cannot land or be verified before step 3.

## Work inventory

| Repo | Text-only | Block spinners | Gate/route | Total |
| --- | --- | --- | --- | --- |
| geiger-events | 20 | 58 | 1 | 79 |
| geiger-comms | 4 | 50 (44 panel) | 2 | 56 |
| geiger-assets | 0 | 25 | 0 | 25 |
| geiger-flow | 4 | 2 | 2 | 8 |
| geiger-dash | 0 | 7 | 0 | 7 |
| geiger-forms | 1 | 3 | 1 | 5 |
| geiger-content | 3 | 0 | 1 | 4 |
| geiger-campaign | 2 | 0 | 1 | 3 |
| geiger-property | 2 | 0 | 1 | 3 |
| geiger-notes | 0 | 1 | 1 | 2 |

geiger-events and geiger-comms together are ~70% of the work.

Counts are the survey estimate. Each is re-confirmed per repo during
implementation; the true figure is whatever matches the replacement criteria.

## Verification

Per repo, in order:

1. `npx eslint .` — clean, or no new findings versus a pre-change baseline.
2. Grep assertion: no `animate-spin` survives within 3 lines of a centered-block
   container (`items-center justify-center` with `py-`, `h-full`, or `min-h-`).
3. Grep assertion: no bare `Loading…` / `Loading...` text node remains in a block
   position (a line whose only content is the loading string).
4. `npx next build` on the two highest-volume apps (geiger-events, geiger-comms)
   to confirm no import or SSR regression from the pin bump.

Assertions 2 and 3 are expected to return zero *in-scope* hits. Out-of-scope hits
(buttons, inline, `h-3`) remain and are correct.

## Corrections made during implementation

The survey above was written before the code was touched. Five things it got
wrong, recorded here because the spec is the artifact people will read:

1. **`geiger-comms/components/widget/` is out of scope.** It has its own
   `widget.css` with `gc-`-prefixed classes and zero `@geiger/ui` imports — the
   embeddable customer widget, deliberately isolated so it ships without the
   design system. Importing a geiger-ui component there would pull the library
   into the widget bundle. Its `LoadingState` keeps its CSS spinner. That drops
   the app-local wrapper count from seven to six.

2. **App-local `LoadingArea` maps to `LoadingArea`, not `LoadingScreen`.** The
   spec assumed these were full-page gates. They are not: geiger-events renders
   `<LoadingArea />` inside screens (`affiliates_roster`, `packages_settings`,
   `addons_settings`) as well as at route level, and the markup is `h-full`, not
   full-viewport. `LoadingScreen`'s `min-h-screen` would have broken every
   nested case. `LoadingScreen` is used only where the container really was
   full-viewport: geiger-flow's three Suspense fallbacks and route `loading.jsx`,
   and geiger-campaign's home fallback.

3. **Most containers are kept, not replaced.** Only the uniform generic panel
   shape became `<LoadingArea panel />`. The rest of the containers are
   load-bearing — `h-64` panels, `aspect-square` thumbnail tiles,
   `absolute inset-0` video overlays, `text-white/50` on dark — so they are left
   untouched and only their contents change to `<LogoLoading size={40} />`.
   `LogoLoading` renders with `fill="currentColor"`, so the white-on-dark
   overlays keep working. This trades some container duplication for zero layout
   regression, which is the right way round.

4. **Spinners are not all `Loader2`.** Also found and converted: hand-rolled CSS
   ring spinners (`animate-spin rounded-full border-2`) in geiger-flow, and
   `animate-pulse` on a themed icon (`Upload`, `Inbox`) in two geiger-flow
   screens. The assertion greps were extended to cover both.

5. **Two sites that look in scope are not.** `geiger-notes` `UserDrawer` renders
   a spinner beside "Waiting for host approval" — a persistent status pill, not a
   fetch placeholder. `geiger-dash` `organizations-client` shows "Checking
   availability…" inline beside a domain input. Both keep their spinners.

Two components had a caption that was not a static string and were handled
individually rather than by pattern: `geiger-comms` `agent/actions.jsx`
(`Loading ${showingProcedures ? "procedures" : "actions"}`) and geiger-events
`brand_import.jsx` (`Reading ${url}`) / `event_conference.jsx`
(`Loading ${tabTitle}`). Their captions became template-literal `label` values.

### Result

| Repo | LoadingArea | LoadingScreen | LogoLoading | Total |
| --- | --- | --- | --- | --- |
| geiger-events | 23 | 0 | 108 | 131 |
| geiger-comms | 56 | 0 | 7 | 63 |
| geiger-flow | 4 | 4 | 34 | 42 |
| geiger-assets | 0 | 0 | 28 | 28 |
| geiger-dash | 1 | 0 | 10 | 11 |
| geiger-property | 6 | 0 | 3 | 9 |
| geiger-forms | 1 | 0 | 5 | 6 |
| geiger-campaign | 3 | 1 | 0 | 4 |
| geiger-content | 4 | 0 | 0 | 4 |
| geiger-notes | 0 | 0 | 4 | 4 |

302 loading call sites, all on the house mark. Verified: 268 files parse clean,
zero missing or dead imports, `next build` green on all ten apps. The assertion
greps return three caption hits and five spinner hits, each confirmed out of
scope by the criteria above (two skeletons, one `sr-only`, one status pill, one
inline domain check, and three in-button spinners).

## Risks

- **The pin bump touches all 10 apps.** A bad geiger-ui commit breaks the suite at
  once. Mitigated by building geiger-events and geiger-comms before bumping the
  remaining eight.
- **Weighted-random variants.** `LogoLoading` rolls a variant per mount unless
  `name` is pinned, so loaders differ between mounts by design. Not a defect.
- **Lost visible context.** Dropping `"Loading campaigns…"` removes an on-screen
  cue. Accepted; preserved as an accessible label.
