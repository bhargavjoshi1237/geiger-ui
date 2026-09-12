"use client";

import Logo from "./logo.jsx";
import ThemeToggle from "./theme-toggle.jsx";
import { SuiteMegaMenu } from "./suite-mega-menu.jsx";

// Shared landing header for every product's public "/" page.
//
// Presentational on purpose: each app resolves its own session (the Supabase
// server client differs per product), then passes the result down. `userId`
// only drives the mega menu's dashboard/sign-in CTA; the avatar dropdown itself
// arrives as the `profile` slot so this package never has to know how a given
// app builds one.
//
// `top-[var(--geiger-banner-h,0px)]` keeps the bar below GlobalBanner when one
// is mounted and flush to the top when none is.
export function SuiteHeader({
  userId = null,
  profile = null,
  megaMenu = true,
  themeToggle = true,
  signInHref = "/login",
  dashboardHref = "/org",
  homeHref = "/",
  logoSrc = "/logo1.svg",
  label = "Geiger Studios",
  products,
  resources,
}) {
  return (
    <header className="fixed left-0 right-0 top-[var(--geiger-banner-h,0px)] z-50 border-b border-border bg-background md:border-border/50 md:bg-background/85 md:backdrop-blur-md">
      <div className="relative mx-auto flex h-12 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href={homeHref} className="flex min-w-0 items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center">
            <Logo size={20} className="text-foreground" />
          </div>
          <span className="truncate text-sm font-bold tracking-tight text-foreground dark:bg-gradient-to-r dark:from-zinc-100 dark:to-zinc-400 dark:bg-clip-text dark:text-transparent sm:text-md">
            {label}
          </span>
        </a>

        {megaMenu ? (
          <SuiteMegaMenu
            userId={userId}
            products={products}
            resources={resources}
            signInHref={signInHref}
            dashboardHref={dashboardHref}
            logoSrc={logoSrc}
          />
        ) : null}

        <div className="hidden items-center gap-4 md:flex">
          {themeToggle ? <ThemeToggle /> : null}
          {profile ?? (
            <a
              href={signInHref}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign In
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
