"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  Loader2,
  X,
} from "lucide-react";

// Suite toast host — render <Toaster /> once near the app root, then call
// toast() from anywhere.
//
// Icons. A toast shows a leading icon when it has a type (success / info /
// warning / error / loading) or when one is passed explicitly — the defaults
// below cover the types plus the close button, and anything you pass wins:
//
//   Per type, for the whole app — pass any <svg> (or a component that renders
//   one) to the `icons` prop. Only the keys you pass are replaced:
//     <Toaster icons={{ success: <svg viewBox="0 0 24 24">…</svg> }} />
//
//   Per toast — pass `icon`, which overrides the type icon for that toast and
//   is the way to give a plain toast one:
//     toast.success("Saved", { icon: <svg viewBox="0 0 24 24">…</svg> })
//     toast("Deploying", { icon: <Rocket /> })
//
//   Pass null to drop an icon — `{ icon: null }` on one toast, or
//   `icons={{ success: null }}` for every toast of that type.
//
// The `icon` slot sizes svgs to 16px, so a bare <svg> with no width/height
// still lands right; an svg carrying its own `size-*` class keeps it. Colour
// is not forced — an svg with no colour class inherits the toast's text.

const ICON_SLOT = "shrink-0 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

const DEFAULT_ICONS = {
  success: <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />,
  info: <Info className="size-4 text-blue-600 dark:text-blue-400" />,
  warning: <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400" />,
  error: <AlertCircle className="size-4 text-destructive-text" />,
  loading: <Loader2 className="size-4 animate-spin text-muted-foreground" />,
  close: <X className="size-3.5" />,
};

const Toaster = ({ icons, toastOptions, ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      icons={{ ...DEFAULT_ICONS, ...icons }}
      style={{
        "--normal-bg": "var(--surface-dialog)",
        "--normal-text": "var(--foreground)",
        "--normal-border": "var(--border-strong)",
      }}
      toastOptions={{
        ...toastOptions,
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-surface-dialog group-[.toaster]:text-foreground group-[.toaster]:border-border-strong group-[.toaster]:shadow-lg",
          title: "capitalize",
          description: "capitalize group-[.toast]:text-muted-foreground",
          icon: ICON_SLOT,
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          ...toastOptions?.classNames,
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
