"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "./input.jsx";
import { cn } from "../lib/utils";

// Suite collapsible search: a bare search icon that expands into a field on
// click, so a toolbar row keeps its space until the user actually searches.
// Controlled on `value`/`onChange` (onChange receives the string, not an event);
// the open state is internal unless `open`/`onOpenChange` are supplied.
// Escape clears and collapses; blurring an empty field collapses too.
export function ExpandableSearch({
  value = "",
  onChange,
  placeholder = "Search",
  label = "Search",
  expandedWidth = "14rem",
  open: openProp,
  onOpenChange,
  autoFocus = true,
  className,
  inputClassName,
}) {
  const [openState, setOpenState] = React.useState(false);
  const inputRef = React.useRef(null);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : openState;

  const setOpen = React.useCallback(
    (next) => {
      if (!isControlled) setOpenState(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  React.useEffect(() => {
    if (open && autoFocus) inputRef.current?.focus();
  }, [open, autoFocus]);

  function collapse() {
    onChange?.("");
    setOpen(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      collapse();
    }
  }

  return (
    <div
      style={{ width: open ? expandedWidth : "2.25rem" }}
      className={cn(
        "relative h-9 shrink-0 transition-[width] duration-200 ease-out",
        className,
      )}
    >
      {open ? (
        <>
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="search"
            value={value}
            placeholder={placeholder}
            aria-label={label}
            onChange={(event) => onChange?.(event.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              if (!value) setOpen(false);
            }}
            className={cn(
              "h-9 w-full bg-surface-card pl-8",
              value ? "pr-8" : "pr-3",
              inputClassName,
            )}
          />
          {value ? (
            <button
              type="button"
              aria-label="Clear search"
              // Mouse-down beats the input's blur, so the field stays open long
              // enough for the click to register as a clear.
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                onChange?.("");
                inputRef.current?.focus();
              }}
              className="absolute right-2 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          ) : null}
        </>
      ) : (
        <button
          type="button"
          aria-label={label}
          aria-expanded={false}
          onClick={() => setOpen(true)}
          className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface-card hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Search className="size-4" />
        </button>
      )}
    </div>
  );
}

export default ExpandableSearch;
