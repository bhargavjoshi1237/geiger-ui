<div align="center">

# @geiger/ui

**The shared component library of the Geiger suite.**

shadcn/ui primitives plus the suite's semantic design tokens — one design language across every Geiger product.

</div>

---

## Overview

`@geiger/ui` is the single source of UI truth for the Geiger suite. Every product — Events, Flow, Notes, Forms, Content, Campaign, Chat, Comms, Docs, Property — imports its primitives and tokens from here, so a button, a table, or a dialog looks and behaves identically wherever you meet it.

The package is **source-shipped and GitHub-installed**: there is no build step. Consuming Next.js apps transpile the JSX directly, which keeps the library trivial to change and impossible to get out of sync with a stale build artefact.

Canonical source of the primitives: **geiger-flow** `components/ui/`.

## Install

```bash
npm i github:bhargavjoshi1237/geiger-ui#v0.1.0
```

The peer dependencies (`react`, `radix-ui`, `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`, `sonner`, `next-themes`) are already present in every Geiger app, so there is nothing extra to install. Optional peers (`recharts`, `input-otp`, the standalone Radix slider/switch/tabs packages) are only needed by the components that use them. `react-hook-form` and `vaul` ship as regular dependencies because the root barrel imports the form and drawer components; apps can still declare their own copy and npm will dedupe when the range matches.

## Wire it up

Three steps per app.

**1. Transpile the package** — `next.config.mjs`:

```js
const nextConfig = { transpilePackages: ["@geiger/ui"] };
```

**2. Import tokens and scan the package** — `app/globals.css`:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@geiger/ui/tokens.css";
@source "../node_modules/@geiger/ui/src";
```

Drop the app's own duplicated `:root` / `.dark` token blocks — `tokens.css` owns them now.

**3. Use it**:

```jsx
import { Button, Card, Sidebar } from "@geiger/ui";
```

## Layout

```
src/
  ui/            shadcn primitives — the shared components
  nav/           navigation visibility: config schema, resolver, settings UI
  lib/utils.js   cn() helper
  tokens.css     design tokens (:root / .dark), base layer, and suite utilities
  index.js       public barrel — the single import surface
```

## Navigation visibility

Every product lets users decide what sits in the sidebar — and every product has
screens that can't work alone. `@geiger/ui` owns both halves so no app
re-implements them: the app declares its rules in a **`geiger-ui.config.js`**, the
library enforces them.

**1. Declare the rules** — `geiger-ui.config.js` in the app root:

```js
import { defineNavConfig } from "@geiger/ui";

export default defineNavConfig({
  product: "events",

  // Never hideable — the app is unusable without them.
  locked: ["Overview", "Settings"],

  // Hidden until a user turns them on (optional).
  hiddenByDefault: [],

  // The rules section. One entry per dependent nav title; `requires` lists the
  // titles it can't function without. Titles match the nav tree exactly and
  // address top-level sections and sub-items alike.
  dependencies: [
    {
      screen: "Session Check-in",
      requires: ["Check-in", "Agenda Builder"],
      reason: "Session check-in scans against the agenda's sessions.",
    },
  ],
});
```

The config is validated and frozen at import: bad shapes, self-references and
requirement **cycles** throw immediately rather than producing a sidebar that
can't be toggled back out.

**2. Filter the sidebar** with the user's hidden titles:

```js
import { applyNavVisibility } from "@geiger/ui";
import navConfig from "@/geiger-ui.config";

const visibleNav = applyNavVisibility(workspaceNav, hiddenTitles, navConfig);
```

A section whose sub-items are all hidden disappears too.

**3. Render the settings surface**:

```jsx
import { NavVisibilitySettings } from "@geiger/ui";

<NavVisibilitySettings
  nav={workspaceNav}
  config={navConfig}
  hidden={hiddenTitles}
  onToggle={(title, nextHidden) => persist(title, nextHidden)}
  onReset={showAll}
/>;
```

### The guarantee

**A visible entry's requirements are visible too**, enforced from both directions:
hiding an entry is blocked while something visible needs it, and showing an entry
is blocked while its requirements are still hidden. A blocked switch is disabled
and says why on hover — nothing is ever hidden or shown behind the user's back.

The app owns **persistence only**. Where the hidden list lives (per user, per
project, local storage, a table) is a product decision; `sanitizeHidden()` drops
stale and locked titles before you trust a stored list.

Everything except the settings component is pure — no React, no I/O — so it is
safe to call during render.

## Versioning

Released as git tags (`v0.1.0`, `v0.2.0`, …). Apps pin a tag or a commit SHA; bump the reference and `npm i` to upgrade.

## Contributing

Changes land here, not in an app's local copy. If a product needs a primitive changed, change it in this repository, push, pin the new SHA in the consuming app, and import from `@geiger/ui`.

Conventions for components living here:

- **No app aliases.** Internal imports are relative: `import { cn } from "../lib/utils.js"`, `import { Button } from "./button.jsx"`. The app-level `@/` alias does not resolve inside the package.
- **Keep `"use client"` directives intact.**
- **No app coupling.** Primitives in `ui/` must not import Supabase, app context, or product-specific logic — those stay app-side.
- **Export through the barrel.** A new component is only public once it is exported from `src/index.js`.

Lint before pushing:

```bash
npm run lint
```

## The Geiger suite

Every Geiger product consumes this library, so a change here is a change everywhere. That is the point — and the reason to treat additions deliberately.

## License

Private and unpublished. All rights reserved.
