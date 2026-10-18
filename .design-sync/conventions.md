## Building with @geiger/ui

The shared component library of the Geiger suite — shadcn/ui primitives plus the suite's
semantic tokens. Every Geiger product (Dash, Flow, Notes, Events, Forms, Docs…) uses these
exact components, so anything built here should look like it belongs in that suite.

### Styling idiom: Tailwind utilities over semantic tokens

Style with **Tailwind utility classes**, and reach for the **semantic token utilities** rather
than raw palette colors. Never hardcode a hex value — every color below flips correctly between
light and dark.

| Purpose | Classes |
|---|---|
| Surfaces | `bg-background`, `bg-surface-subtle`, `bg-surface-card`, `bg-surface-hover`, `bg-surface-active`, `bg-surface-strong`, `bg-surface-dialog` |
| Component surfaces | `bg-card`, `bg-popover`, `bg-muted`, `bg-accent`, `bg-secondary`, `bg-sidebar` |
| Brand / intent | `bg-primary` + `text-primary-foreground`, `bg-destructive` |
| Text | `text-foreground`, `text-muted-foreground`, `text-text-secondary`, `text-text-tertiary` |
| Borders | `border-border`, `border-border-strong` |
| Radius | `rounded-sm` `rounded-md` `rounded-lg` `rounded-xl` `rounded-2xl` `rounded-full` |

Chart series colors are **not** utility classes — they are the CSS variables `var(--chart-1)` …
`var(--chart-5)`, passed through `ChartContainer`'s `config` (`{ visits: { label: "Visits",
color: "var(--chart-1)" } }`), which exposes them to the chart as `var(--color-<key>)`.

Two extra utilities the suite defines: `scrollbar-subtle` (thin themed scrollbar) and
`geiger-logo`.

### ⚠ The utility set is precompiled — check before you use one

This library ships a **prebuilt stylesheet** (`styles.css` → `_ds_bundle.css`), not a Tailwind
build. It contains only the ~1,000 utilities the components themselves use. A class outside that
set produces **no CSS at all** and fails silently.

Confirmed present: `flex` `grid` `items-center` `justify-between` `w-full` `h-full` `min-h-screen`
`truncate` `text-center` `shadow-sm` `size-4` `grid-cols-2` `max-w-md` `max-w-2xl` `space-y-4`
`mt-4`, `gap-0/1/2/3/4/5/6/8`, `p-0/1/2/3/4/6/8`, `px-6`, `py-8`, `text-xs/sm/base/lg/xl/2xl/3xl/4xl`.

Absent (examples of the trap): `grid-cols-4`, `text-5xl`, raw palette backgrounds like
`bg-emerald-400` / `bg-sky-400`, and **any arbitrary value the components don't use themselves** —
`w-[520px]`, `h-[260px]` do nothing.

**So: for any sizing or layout value not listed above, use an inline `style={{…}}`.** Use the
token utilities for color and the inline style for geometry. If unsure whether a class exists,
grep `_ds_bundle.css` for it.

### Theme and wrappers

Tokens live on `:root`, so components are styled **with no provider** — light theme is the
default. For dark, put `className="dark"` on an ancestor (the `.dark` class carries the whole
token set; the suite's dark canvas is `#161616`).

These components need a wrapper:

- `Sidebar` and every `Sidebar*` part → wrap in `SidebarProvider`; put page content in `SidebarInset`.
- `Topbar` → also inside `SidebarProvider` (its default sidebar trigger throws without one), or pass
  a `sidebarTrigger` element. Pass `logoSrc` — the default `/logo1.svg` is not shipped.
- `Tooltip` → wrap in `TooltipProvider`.
- `GlobalBanner` → wrap in `BannerProvider`; use `position="static"` inside a layout.

`ThemeToggle` renders but cannot switch theme in a design (no theme provider is exported) — to show
dark mode, put `className="dark"` on an ancestor instead.

`Toaster` is exported but `toast()` is **not** — a design cannot fire a toast. Show feedback
inline instead (a `Badge`, a `Card` message, or `GlobalBanner`).

The font is **Geist** (and Geist Mono), shipped with the bundle — never set a `font-family`.

`Badge` variants are `default` `neutral` `success` `info` `warning` `danger` `purple` `outline`
(no `secondary`/`destructive` — unknown variants silently render neutral). `Button` variants are
`default` `secondary` `outline` `ghost` `link` `destructive`.

### Build screens from the screen kit

Workspace screens follow one frame: `ScreenHeader` (title, description, actions) → `StatsBar`
(KPI strip; `StatGrid`/`StatTile` for separate tiles) → `Toolbar` with `SearchInput` → `DataTable`
(`columns: [{ key, header, align, render }]`, `data`, `getRowKey`) with `StatusPill` cells → `EmptyState`
when there are no rows. Group settings in `SectionCard` + `SettingsList`/`SettingRow`; wrap form
controls in `Field`. Loading: `LoadingArea` (section) / `LoadingScreen` (page), or `LogoLoading`.
`StatusPill` takes `status` plus a `map` keyed by status (`{ live: { label: "Live", variant:
"success" } }`); omit `dotClass` — the dot inherits the pill colour.

Other suite composites — prefer them over rebuilding the shape: `Topbar`, `SuiteHeader`,
`CommandPalette`, `ActionMenu`, `Logo`, `SearchBar`, `IssueItem`, `Timeline`, `ActivityCalendar`,
`EventModal`.

### Where the truth is

Read the real files before styling: `styles.css` and its import `_ds_bundle.css` (every available
utility and token), plus each component's `<Name>.d.ts` (the props contract) and `<Name>.prompt.md`.

### Idiomatic example

```jsx
<Card className="bg-surface-card border-border">
  <CardHeader>
    <CardTitle className="text-foreground">Deployments</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-muted-foreground">Last run 4m ago</span>
      <Button size="sm">Redeploy</Button>
    </div>
    <div style={{ height: 180, marginTop: 12 }}>{/* geometry: inline style */}</div>
  </CardContent>
</Card>
```
