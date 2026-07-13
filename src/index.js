// @geiger/ui — public barrel. Single import surface for the suite.
// Components live in ./ui/*.jsx; the cn() helper in ./lib/utils.js.
// Design tokens ship separately as "@geiger/ui/tokens.css" (imported in app CSS).

// Utility
export { cn } from "./lib/utils.js";

// Primitives (named exports)
export * from "./ui/accordion.jsx";
export * from "./ui/avatar.jsx";
export * from "./ui/badge.jsx";
export * from "./ui/button.jsx";
export * from "./ui/card.jsx";
export * from "./ui/chart.jsx";
export * from "./ui/context-menu.jsx";
export * from "./ui/dialog.jsx";
export * from "./ui/dropdown-menu.jsx";
export * from "./ui/hover-card.jsx";
export * from "./ui/input.jsx";
export * from "./ui/input-otp.jsx";
export * from "./ui/kbd.jsx";
export * from "./ui/label.jsx";
export * from "./ui/popover.jsx";
export * from "./ui/progress.jsx";
export * from "./ui/radio-group.jsx";
export * from "./ui/scroll-area.jsx";
export * from "./ui/select.jsx";
export * from "./ui/separator.jsx";
export * from "./ui/sheet.jsx";
export * from "./ui/sidebar.jsx";
export * from "./ui/skeleton.jsx";
export * from "./ui/slider.jsx";
export * from "./ui/sonner.jsx";
export * from "./ui/switch.jsx";
export * from "./ui/table.jsx";
export * from "./ui/tabs.jsx";
export * from "./ui/textarea.jsx";
export * from "./ui/toggle.jsx";
export * from "./ui/toggle-group.jsx";
export * from "./ui/tooltip.jsx";

// Composite / suite components
export * from "./ui/activity-calendar.jsx";
export * from "./ui/calendar.jsx";
export * from "./ui/issue-item.jsx";
export * from "./ui/search-bar.jsx";
export * from "./ui/topbar.jsx";

// Default-export components (re-exported as named)
export { default as Logo } from "./ui/logo.jsx";
export { default as Footer } from "./ui/footer.jsx";
export { default as ThemeToggle } from "./ui/theme-toggle.jsx";

// Hooks
export { useIsMobile } from "./lib/hooks/use-mobile.js";
