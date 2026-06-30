# @geiger/ui

Shared UI component library for the Geiger suite — shadcn/ui primitives plus the
suite's semantic design tokens, distributed as a **source-shipped, GitHub-installed**
package (no build step; consuming Next.js apps transpile the JSX).

Canonical source: **geiger-flow** `components/ui/`.

## Install (in a consuming app)

```bash
npm i github:bhargavjoshi1237/geiger-ui#v0.1.0
```

The peer deps (`react`, `radix-ui`, `lucide-react`, `class-variance-authority`,
`clsx`, `tailwind-merge`, `sonner`, `next-themes`) are already present in every
geiger app, so nothing extra to install.

## Wire it up (3 steps per app)

1. **Transpile the package** — `next.config.mjs`:
   ```js
   const nextConfig = { transpilePackages: ["@geiger/ui"] };
   ```
2. **Import tokens + scan the package** — `app/globals.css`:
   ```css
   @import "tailwindcss";
   @import "tw-animate-css";
   @import "shadcn/tailwind.css";
   @import "@geiger/ui/tokens.css";
   @source "../node_modules/@geiger/ui/src";
   ```
   (Drop the app's own duplicated `:root`/`.dark` token blocks — `tokens.css` owns them now.)
3. **Use it**:
   ```jsx
   import { Button, Card, Sidebar } from "@geiger/ui";
   ```

## Versioning

Git tags (`v0.1.0`, `v0.2.0`, …). Apps pin a tag; bump + `npm i` to upgrade.

## Layout

```
src/
  ui/          shadcn primitives (the shared components)
  lib/utils.js cn() helper
  tokens.css   design tokens (:root / .dark) + base layer + suite utilities
  index.js     public barrel — single import surface
```

## Conventions for components living here

- Components must NOT use the app-level `@/` alias. Internal imports are relative:
  `import { cn } from "../lib/utils.js"`, `import { Button } from "./button.jsx"`.
- Keep `"use client"` directives intact.
- No Supabase / app-context coupling in `ui/` primitives (those stay app-side).
