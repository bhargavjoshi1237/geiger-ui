// @geiger/ui — public barrel. Every shared component is re-exported from here so
// consuming apps import from a single path:  import { Button, Card } from "@geiger/ui"
//
// Components are added to ./ui as we migrate them from geiger-flow (the canonical
// source). Each line below is filled in once the component file lands in ./ui.
//
// Example (uncomment as files are added):
// export * from "./ui/button.jsx";
// export * from "./ui/card.jsx";
// export { default as Logo } from "./ui/logo.jsx";       // default-export components
// export { default as Footer } from "./ui/footer.jsx";
// export { default as ThemeToggle } from "./ui/theme-toggle.jsx";

export { cn } from "./lib/utils.js";
