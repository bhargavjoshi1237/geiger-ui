"use client";

import * as React from "react";
import { Check, ChevronDown, Search, Shapes, X } from "lucide-react";

import { cn } from "../lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ScrollArea } from "./scroll-area";

// Searchable lucide icon picker. Icon choices are stored as PascalCase names
// ("GraduationCap") so they persist as plain data — render one back with
// <LucideIcon name="GraduationCap" />.
//
// The full lucide set is ~1,700 components, so the barrel is imported lazily
// and once per page: nothing ships until a picker opens or an icon renders.

let iconsPromise = null;
let iconsMap = null;

function loadIcons() {
  if (iconsMap) return Promise.resolve(iconsMap);
  if (!iconsPromise) {
    iconsPromise = import("lucide-react").then((mod) => {
      iconsMap = mod.icons;
      return iconsMap;
    });
  }
  return iconsPromise;
}

// Resolves the lucide set, kicking off the one shared fetch on first use.
// Returns null until it lands, so callers render a placeholder meanwhile.
export function useLucideIcons() {
  const [icons, setIcons] = React.useState(iconsMap);

  React.useEffect(() => {
    if (icons) return;
    let alive = true;
    loadIcons().then((loaded) => alive && setIcons(loaded));
    return () => {
      alive = false;
    };
  }, [icons]);

  return icons;
}

// "GraduationCap" / "graduation-cap" -> "Graduation Cap".
export function humanizeIconName(name) {
  return String(name || "")
    .replace(/[-_]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim();
}

// Accepts either casing so stored values from other sources still resolve.
export function toIconName(name) {
  const raw = String(name || "");
  if (!raw) return "";
  if (!raw.includes("-") && !raw.includes("_")) {
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  }
  return raw
    .split(/[-_]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

// Renders any lucide icon by name. `fallback` covers both the moment before
// the set loads and names that no longer exist in lucide.
export function LucideIcon({ name, fallback: Fallback = Shapes, className, ...props }) {
  const icons = useLucideIcons();
  const Icon = icons?.[toIconName(name)];

  if (!icons) {
    // Same box, no flicker — the real icon swaps in once the set lands.
    return <Fallback aria-hidden className={cn(className, "opacity-0")} {...props} />;
  }
  if (!Icon) return <Fallback className={className} {...props} />;
  return <Icon className={className} {...props} />;
}

function matches(name, query) {
  if (!query) return true;
  const haystack = `${name} ${humanizeIconName(name)}`.toLowerCase();
  return query.split(/\s+/).every((term) => haystack.includes(term));
}

export function IconPicker({
  value,
  onValueChange,
  placeholder = "Choose an icon",
  className,
  contentClassName,
  align = "start",
  disabled = false,
  pageSize = 240,
  id,
  ...props
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [limit, setLimit] = React.useState(pageSize);
  const icons = useLucideIcons();
  const selected = toIconName(value);

  const names = React.useMemo(() => (icons ? Object.keys(icons) : []), [icons]);

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return names;
    return names.filter((name) => matches(name, q));
  }, [names, query]);

  const visible = results.slice(0, limit);

  const choose = (name) => {
    onValueChange?.(name);
    setOpen(false);
  };

  const onOpenChange = (next) => {
    setOpen(next);
    if (!next) {
      setQuery("");
      setLimit(pageSize);
    }
  };

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          disabled={disabled}
          data-slot="icon-picker-trigger"
          className={cn(
            "flex h-10 w-full items-center justify-between gap-2 rounded-md border border-border bg-surface-card px-3 py-2 text-sm text-foreground outline-none transition-colors focus-visible:border-border-strong focus-visible:ring-2 focus-visible:ring-border disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        >
          <span className="flex min-w-0 items-center gap-2">
            {selected ? (
              <>
                <LucideIcon name={selected} className="size-4 shrink-0 text-muted-foreground" />
                <span className="truncate">{humanizeIconName(selected)}</span>
              </>
            ) : (
              <span className="text-text-tertiary">{placeholder}</span>
            )}
          </span>
          <ChevronDown className="size-4 shrink-0 text-text-secondary" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align={align}
        className={cn("w-[var(--radix-popover-trigger-width)] min-w-80 p-0", contentClassName)}
      >
        <div className="relative border-b border-border">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-secondary" />
          <Input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLimit(pageSize);
            }}
            placeholder="Search icons…"
            aria-label="Search icons"
            className="!h-10 !rounded-none border-0 !pl-9 !pr-9 shadow-none focus-visible:ring-0"
          />
          {query ? (
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-text-secondary"
              onClick={() => {
                setQuery("");
                setLimit(pageSize);
              }}
            >
              <X />
            </Button>
          ) : null}
        </div>

        <ScrollArea className="h-64">
          {!icons ? (
            <p className="px-3 py-8 text-center text-sm text-text-secondary">Loading icons…</p>
          ) : results.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-text-secondary">
              No icons match “{query}”.
            </p>
          ) : (
            <div className="grid grid-cols-8 gap-1 p-2">
              {visible.map((name) => {
                const Icon = icons[name];
                const isSelected = name === selected;
                return (
                  <button
                    key={name}
                    type="button"
                    title={humanizeIconName(name)}
                    aria-label={humanizeIconName(name)}
                    aria-pressed={isSelected}
                    onClick={() => choose(name)}
                    className={cn(
                      "relative flex aspect-square items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-surface-active hover:text-foreground focus-visible:ring-2 focus-visible:ring-border",
                      isSelected && "bg-surface-active text-foreground ring-2 ring-border-strong",
                    )}
                  >
                    <Icon className="size-4" />
                    {isSelected ? (
                      <Check className="absolute -right-0.5 -top-0.5 size-2.5 text-foreground" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          )}
        </ScrollArea>

        {icons && results.length > visible.length ? (
          <div className="border-t border-border p-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="w-full text-text-secondary"
              onClick={() => setLimit((n) => n + pageSize)}
            >
              Load more ({results.length - visible.length} left)
            </Button>
          </div>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}
