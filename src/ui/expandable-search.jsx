"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "./input.jsx";
import { cn } from "../lib/utils";

// Adornments sit on the field's own gutter, measured from the same
// --input-box-* tokens Input pads itself with, so the glyph lines up with the
// text of every other field in the suite instead of a hardcoded 10px.
// Written out in full rather than composed from parts: Tailwind scans source
// text, so an interpolated class name never reaches the generated CSS.
const ADORNMENT = "absolute top-1/2 size-4 -translate-y-1/2 text-muted-foreground";
const LEAD_INSET = "left-[var(--input-box-padding-x,0.75rem)]";
// The clear button is a 20px hit target around a 16px slot, so it sits half
// that difference further out to keep both glyph centres on the same gutter.
const TRAIL_INSET = "size-5 right-[calc(var(--input-box-padding-x,0.75rem)-0.125rem)]";
// Gutter = the field's own padding + the icon + a token-sized gap after it.
const GUTTER_START =
  "pl-[calc(var(--input-box-padding-x,0.75rem)+1rem+var(--input-box-icon-gap,0.5rem))]";
const GUTTER_END =
  "pr-[calc(var(--input-box-padding-x,0.75rem)+1rem+var(--input-box-icon-gap,0.5rem))]";

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
      // Cap the open width at the flex item's own line so a Toolbar can drop
      // the field onto a full-width row (via flex-wrap/basis) without the
      // fixed rem width overflowing a narrow viewport.
      style={{ width: open ? `min(100%, ${expandedWidth})` : "2.25rem" }}
      className={cn(
        // No fixed height: Input is !h-auto and sizes itself from the shared
        // --input-box-* tokens, so an h-9 here left the field overflowing a
        // 36px box and — because the adornments centre on THIS element —
        // parked the glyphs a few pixels above the text. Hugging the field
        // keeps top-1/2 honest and reports the real height to the toolbar row.
        "relative flex min-h-9 shrink-0 items-center transition-[width] duration-200 ease-out",
        className,
      )}
    >
      {open ? (
        <>
          <Search className={cn(ADORNMENT, "pointer-events-none", LEAD_INSET)} />
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
              "block w-full bg-surface-card",
              GUTTER_START,
              value && GUTTER_END,
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
              className={cn(
                ADORNMENT,
                TRAIL_INSET,
                "flex items-center justify-center rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
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
