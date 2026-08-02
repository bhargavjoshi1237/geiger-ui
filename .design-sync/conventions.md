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
build. It contains only the ~580 utilities the components themselves use. A class outside that
set produces **no CSS at all** and fails silently.

Confirmed present: `flex` `grid` `items-center` `justify-between` `w-full` `truncate`
`text-center` `shadow-sm` `size-4` `grid-cols-2` `max-w-md` `space-y-4` `mt-4`, `gap-0/1/2/3/4/6/8`,
`p-0/1/2/3/4/6`, `text-xs/sm/base/lg/xl/2xl/4xl`.

Absent (an example of the trap): `min-h-screen`, and **all arbitrary values** — `w-[520px]`,
`h-[260px]`, `gap-5`, `p-8` do nothing.

**So: for any sizing or layout value not listed above, use an inline `style={{…}}`.** Use the
token utilities for color and the inline style for geometry. If unsure whether a class exists,
grep `_ds_bundle.css` for it.

### Theme and wrappers

Tokens live on `:root`, so components are styled **with no provider** — light theme is the
default. For dark, put `className="dark"` on an ancestor (the `.dark` class carries the whole
token set; the suite's dark canvas is `#161616`).

Three components do need a wrapper, and only these:

- `Sidebar` and every `Sidebar*` part → wrap in `SidebarProvider`; put page content in `SidebarInset`.
- `Tooltip` → wrap in `TooltipProvider`.
- `toast()` calls → render `<Toaster />` once at the app root.

`ThemeToggle` flips light/dark. `Topbar`, `CommandPalette`, `Logo`, `SearchBar`, `IssueItem`,
`Timeline`, `ActivityCalendar` and `EventModal` are suite-level composites — prefer them over
rebuilding those shapes.

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
