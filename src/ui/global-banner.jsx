"use client";

import React from "react";
import { AlertCircle, Info, X } from "lucide-react";
import { Button } from "./button.jsx";
import { cn } from "../lib/utils.js";

// Shared suite banner — the full-width notice strip that sits above the topbar
// (maintenance windows, trial/plan warnings, incident notices).
//
// Wrap the app in <BannerProvider> and render <GlobalBanner /> as its first
// child; anything below can then call useBanner().showBanner({ … }).
//
//   <BannerProvider initial={{ message: "Maintenance Sunday 02:00 UTC" }}>
//     <GlobalBanner />
//     {children}
//   </BannerProvider>
//
// A banner is `{ message, type: "warning" | "info", dismissible, link }`, where
// link is `{ text, href, external? }`.
//
// Layout contract — the strip is fixed by default so it survives scrolling, and
// the provider keeps the rest of the page clear of it:
//   - `--geiger-banner-h` on <html> is the strip's height (0px when hidden).
//     Offset the app's fixed header with `top-[var(--geiger-banner-h,0px)]`.
//   - `offsetBody` (on by default in fixed mode) pads <body> by the same amount
//     so page content shifts down instead of hiding underneath.
//   - `has-banner` is toggled on <html> as a styling hook. An app that wants the
//     offset on the very first paint can define it in its own CSS and set the
//     class server-side:
//       :root { --geiger-banner-h: 0px }
//       :root.has-banner { --geiger-banner-h: 2.25rem }
//       body { padding-top: var(--geiger-banner-h) }
// Pass position="static" to render the strip in normal document flow instead
// (for apps whose header is not fixed) — no offsets are applied then.

const HIDDEN_BANNER = {
  isVisible: false,
  message: "",
  type: "warning",
  dismissible: false,
  link: null,
};

const DEFAULT_BANNER_HEIGHT = "2.25rem";

const BannerContext = React.createContext(null);

// `initial` renders a banner on first paint (server-driven notices); everything
// else arrives through showBanner().
export function BannerProvider({
  children,
  initial = null,
  position = "fixed",
  height = DEFAULT_BANNER_HEIGHT,
  offsetBody,
}) {
  const [banner, setBanner] = React.useState(() =>
    initial?.message
      ? { ...HIDDEN_BANNER, ...initial, isVisible: true }
      : HIDDEN_BANNER,
  );

  const isFixed = position === "fixed";
  const shouldOffsetBody = offsetBody ?? isFixed;

  const showBanner = React.useCallback((config) => {
    setBanner({ ...HIDDEN_BANNER, ...config, isVisible: true });
  }, []);

  const hideBanner = React.useCallback(() => {
    setBanner((prev) => ({ ...prev, isVisible: false }));
  }, []);

  React.useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    root.classList.toggle("has-banner", banner.isVisible);
    root.style.setProperty("--geiger-banner-h", banner.isVisible ? height : "0px");
    if (shouldOffsetBody) {
      body.style.paddingTop = banner.isVisible ? "var(--geiger-banner-h)" : "";
    }
    return () => {
      root.classList.remove("has-banner");
      root.style.removeProperty("--geiger-banner-h");
      if (shouldOffsetBody) body.style.paddingTop = "";
    };
  }, [banner.isVisible, height, shouldOffsetBody]);

  const value = React.useMemo(
    () => ({ banner, showBanner, hideBanner, position, height }),
    [banner, showBanner, hideBanner, position, height],
  );

  return (
    <BannerContext.Provider value={value}>{children}</BannerContext.Provider>
  );
}

export function useBanner() {
  const context = React.useContext(BannerContext);
  if (!context) {
    throw new Error("useBanner must be used within a BannerProvider");
  }
  return context;
}

const BANNER_THEMES = {
  warning: {
    icon: AlertCircle,
    className:
      "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-200",
  },
  info: {
    icon: Info,
    className: "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-200",
  },
};

export function GlobalBanner({ className }) {
  const { banner, hideBanner, position, height } = useBanner();

  if (!banner.isVisible) return null;

  const theme = BANNER_THEMES[banner.type] ?? BANNER_THEMES.warning;
  const Icon = theme.icon;
  const link = banner.link;
  const linkClassName =
    "font-semibold underline decoration-current underline-offset-4 transition-colors hover:text-foreground";

  return (
    <div
      role="status"
      style={{ height: `var(--geiger-banner-h, ${height})` }}
      className={cn(
        "flex w-full items-center justify-center border-b px-4 backdrop-blur",
        position === "fixed" ? "fixed inset-x-0 top-0 z-[60]" : "relative shrink-0",
        theme.className,
        className,
      )}
    >
      {/* Diagonal stripes, tinted from the banner's own text colour. */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,currentColor_0_1px,transparent_1px_10px)] opacity-10" />

      <div className="relative flex min-w-0 items-center gap-2 text-[13px] font-medium">
        <Icon className="size-3.5 shrink-0" />
        <span className="truncate">{banner.message}</span>
        {link ? (
          <>
            <span className="opacity-40" aria-hidden="true">
              ·
            </span>
            <a
              href={link.href}
              className={linkClassName}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : null)}
            >
              {link.text}
            </a>
          </>
        ) : null}
      </div>

      {banner.dismissible ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={hideBanner}
          aria-label="Dismiss banner"
          className="absolute right-2 rounded-full text-current hover:bg-current/10"
        >
          <X className="size-3.5" />
        </Button>
      ) : null}
    </div>
  );
}
