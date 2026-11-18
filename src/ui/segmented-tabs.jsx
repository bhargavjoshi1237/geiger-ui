"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { Button } from "./button.jsx";
import { cn } from "../lib/utils";

const ACTIVE_SURFACE = "bg-background dark:bg-surface-hover shadow-sm";

// Suite segmented tab switcher: a bordered surface-subtle pill rail with one
// button per tab. `tabs` accepts strings or { label, value, icon } objects.
// The active surface is a single pill that slides between tabs.
export function SegmentedTabs({
  tabs,
  value,
  onChange,
  className,
  buttonClassName,
  fullWidth = false,
}) {
  const railRef = useRef(null);
  const pillRef = useRef(null);
  const placedRef = useRef(false);
  // Until the pill is measured (server render, first paint) the active button paints its own surface.
  const [ready, setReady] = useState(false);

  const items = tabs.map((tab) =>
    typeof tab === "string" ? { label: tab, value: tab } : tab,
  );
  const tabKey = items.map((item) => item.value).join("|");

  useLayoutEffect(() => {
    const rail = railRef.current;
    const pill = pillRef.current;
    if (!rail || !pill) return undefined;

    // Moves the pill onto the active tab; the first placement jumps, later ones slide.
    const place = () => {
      const active = rail.querySelector('[data-active="true"]');
      if (!active) {
        pill.style.visibility = "hidden";
        return;
      }
      const first = !placedRef.current;
      if (first) pill.style.transition = "none";
      pill.style.visibility = "visible";
      pill.style.width = `${active.offsetWidth}px`;
      pill.style.height = `${active.offsetHeight}px`;
      pill.style.transform = `translate(${active.offsetLeft}px, ${active.offsetTop}px)`;
      if (first) {
        void pill.offsetWidth;
        pill.style.transition = "";
        placedRef.current = true;
      }
    };

    place();
    setReady(true);

    const observer = new ResizeObserver(place);
    observer.observe(rail);
    for (const button of rail.querySelectorAll("[data-tab]")) observer.observe(button);
    return () => observer.disconnect();
  }, [value, tabKey]);

  return (
    <div
      ref={railRef}
      className={cn(
        "relative flex items-center gap-1 overflow-x-auto rounded-lg border border-border bg-surface-subtle p-1",
        fullWidth ? "w-full" : "w-full sm:w-auto",
        className,
      )}
    >
      <span
        ref={pillRef}
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-0 top-0 rounded-md transition-[transform,width,height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          ACTIVE_SURFACE,
          !ready && "invisible",
        )}
      />
      {items.map((item) => {
        const isActive = value === item.value;
        const Icon = item.icon;

        return (
          <Button
            key={item.value}
            type="button"
            variant="ghost"
            size="sm"
            data-tab
            data-active={isActive}
            onClick={() => onChange?.(item.value)}
            className={cn(
              "relative inline-flex h-8 min-w-max flex-1 items-center justify-center gap-1.5 rounded-md px-3 text-sm font-medium transition-[color,background-color,transform]",
              fullWidth ? "flex-1" : "sm:flex-none",
              isActive
                ? cn("text-foreground hover:bg-transparent dark:hover:bg-transparent", !ready && ACTIVE_SURFACE)
                : "text-text-secondary hover:bg-surface-hover dark:hover:bg-surface-card hover:text-foreground",
              buttonClassName,
            )}
          >
            {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
            {item.label}
          </Button>
        );
      })}
    </div>
  );
}
