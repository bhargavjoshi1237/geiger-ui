"use client";

import React from "react";
import { Search, Bell, HelpCircle } from "lucide-react";
import { Button } from "./button.jsx";
import { Kbd, KbdGroup } from "./kbd.jsx";
import { SidebarTrigger } from "./sidebar.jsx";

// Shared suite topbar (presentational). Product-specific, data-bound pieces are
// passed in as slots so this component stays pure UI and lives in @geiger/ui:
//   - sidebarTrigger: the mobile sidebar toggle. Pass one bound to the app's own
//     SidebarProvider; falls back to this package's SidebarTrigger otherwise.
//   - notifications: the notifications trigger + dropdown (app-wired)
//   - profile: the profile avatar + dropdown (app-wired)
//   - activity: e.g. a Supabase activity line rendered under the header
// `label` is the product name shown next to the logo; `logoSrc` defaults to
// /logo1.svg and the logo links to `homeHref`. `helpHref` points the ? button
// somewhere (e.g. /docs); with no href it renders an inert button. A built-in
// Bell button renders only when no `notifications` slot is provided.
export function Topbar({
  label,
  logoSrc = "/logo1.svg",
  homeHref = "/",
  helpHref,
  searchPlaceholder = "Search...",
  onSearchClick,
  showHelp = true,
  sidebarTrigger = null,
  notifications = null,
  profile = null,
  activity = null,
}) {
  const handleLogoError = (e) => {
    e.currentTarget.style.display = "none";
    if (e.currentTarget.parentElement) {
      e.currentTarget.parentElement.innerHTML =
        '<div class="w-2 h-2 bg-foreground rounded-full"></div>';
    }
  };

  return (
    <header className="relative h-14 px-4 flex items-center justify-between border-b border-border bg-topbar-bg text-foreground z-20 w-full shrink-0">
      <div className="flex items-center gap-1.5">
        {sidebarTrigger ?? (
          <SidebarTrigger className="md:hidden -ml-2 text-foreground" />
        )}
        <a
          href={homeHref}
          aria-label="Home"
          className="hidden w-8 h-8 rounded items-center justify-center shrink-0 md:flex md:-ml-1.5 hover:bg-surface-active transition-colors"
        >
          <img
            src={logoSrc}
            alt=""
            className="w-5 h-5 -mr-0.5"
            onError={handleLogoError}
          />
        </a>
        <div className="flex items-center gap-1 group group-data-[collapsible=icon]:hidden md:border-l md:border-border pl-2 hidden sm:flex">
          <span className="text-foreground font-semibold text-sm ml-1">{label}</span>
        </div>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 md:hidden">
        <img
          src={logoSrc}
          alt=""
          className="h-5 w-5"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <span className="text-sm font-semibold text-foreground">{label}</span>
      </div>

      <div className="flex justify-between gap-4 md:gap-8 sm:mr-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            onClick={onSearchClick}
            variant="ghost"
            className="relative hidden items-center bg-surface-active border border-border hover:border-border-strong transition-colors rounded-md h-8 px-2 sm:flex sm:px-2.5 w-8 sm:w-[240px] justify-center sm:justify-start text-sm text-muted-foreground shadow-sm group"
          >
            <Search className="w-4 h-4 sm:mr-2 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span className="hidden sm:inline-block text-muted-foreground group-hover:text-foreground transition-colors">
              {searchPlaceholder}
            </span>
            <div className="absolute right-1.5 top-1.5 hidden sm:flex items-center gap-1">
              <KbdGroup>
                <Kbd className="bg-surface-subtle border-border text-muted-foreground group-hover:bg-surface-hover group-hover:text-foreground transition-colors">
                  ⌘
                </Kbd>
                <Kbd className="bg-surface-subtle border-border text-muted-foreground group-hover:bg-surface-hover group-hover:text-foreground transition-colors">
                  K
                </Kbd>
              </KbdGroup>
            </div>
          </Button>

          <div className="flex items-center gap-0 sm:gap-1 ml-0 sm:ml-1">
            {showHelp && (
              <Button
                asChild={Boolean(helpHref)}
                variant="ghost"
                size="icon-sm"
                aria-label="Help"
                className="w-8 h-8 rounded-full border border-transparent hover:bg-surface-hover hidden sm:flex items-center justify-center transition-colors text-muted-foreground hover:text-foreground"
              >
                {helpHref ? (
                  <a href={helpHref}>
                    <HelpCircle className="w-[18px] h-[18px]" strokeWidth={2} />
                  </a>
                ) : (
                  <HelpCircle className="w-[18px] h-[18px]" strokeWidth={2} />
                )}
              </Button>
            )}
            {notifications ?? (
              <Button
                variant="ghost"
                size="icon-sm"
                className="w-8 h-8 rounded-full border border-transparent hover:bg-surface-hover hidden items-center justify-center transition-colors text-muted-foreground hover:text-foreground relative sm:flex"
              >
                <Bell className="w-[18px] h-[18px]" strokeWidth={2} />
              </Button>
            )}
            {profile}
          </div>
        </div>
      </div>
      {activity}
    </header>
  );
}
