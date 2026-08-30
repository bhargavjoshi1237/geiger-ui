"use client";

import * as React from "react";
import { MoreHorizontal } from "lucide-react";

import { cn } from "../lib/utils";
import { Button } from "./button.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu.jsx";

// Suite triple-dot row/card action menu. One look for every list surface, so
// call sites pass behaviour and never styling.
//
//   <ActionMenu
//     label={`Actions for ${row.name}`}
//     items={[
//       { icon: Pencil, label: "Edit", onSelect: () => edit(row) },
//       { separator: true },
//       { icon: Trash2, label: "Delete", destructive: true, onSelect: () => remove(row) },
//     ]}
//   />
//
// Items are `{ icon, label, onSelect, destructive, disabled }` or `{ separator: true }`.
// `destructive: true` paints the row (label and icon) in the danger colour;
// `variant: "destructive"` is the same thing spelled the Radix way and still works.
// Falsy entries are dropped, so `canRefund && { ... }` reads naturally, and
// separators left stranded by a dropped item are collapsed away.
//
// Two extras, for the cases that are behaviour rather than styling:
//   `href`  — renders the row as a link, so middle-click and "open in new tab"
//             work. External hrefs get target/rel by default.
//   `spin`  — spins the icon, for a row mid-flight ("Verifying…").

// Drop falsy items, then collapse leading, trailing and repeated separators.
function normalizeItems(items) {
  const present = (items || []).filter(Boolean);
  const out = [];
  for (const item of present) {
    if (item.separator) {
      if (out.length && !out[out.length - 1].separator) out.push(item);
      continue;
    }
    out.push(item);
  }
  while (out.length && out[out.length - 1].separator) out.pop();
  return out;
}

export function ActionMenu({
  items,
  label = "Actions",
  align = "end",
  side,
  icon: TriggerIcon = MoreHorizontal,
  disabled = false,
  className,
  triggerClassName,
  contentClassName,
  ...props
}) {
  const resolved = normalizeItems(items);
  if (!resolved.length) return null;

  return (
    // Rows in these tables are clickable; the menu must not trigger the row.
    <div className={cn("shrink-0", className)} onClick={(e) => e.stopPropagation()}>
      <DropdownMenu {...props}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={label}
            disabled={disabled}
            className={cn(
              "text-muted-foreground hover:bg-surface-active hover:text-foreground",
              triggerClassName,
            )}
          >
            <TriggerIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={align}
          side={side}
          className={cn("w-44", contentClassName)}
        >
          {resolved.map((item, i) => {
            if (item.separator) return <DropdownMenuSeparator key={`sep-${i}`} />;
            const Icon = item.icon;
            // `destructive: true` is the call-site spelling; `variant` is the
            // Radix one. Either gets the danger colour.
            const destructive = item.destructive || item.variant === "destructive";
            const body = (
              <>
                {Icon ? (
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      // Named explicitly so it survives `asChild` links, where the
                      // icon is a grandchild and the item's own svg rule misses it.
                      destructive && "text-destructive-text",
                      item.spin && "animate-spin",
                    )}
                  />
                ) : null}
                {item.label}
              </>
            );
            const external = item.href && /^https?:/i.test(item.href);
            return (
              <DropdownMenuItem
                key={item.key ?? item.label ?? i}
                variant={destructive ? "destructive" : item.variant}
                disabled={item.disabled}
                onSelect={item.onSelect}
                asChild={!!item.href}
                className="cursor-pointer gap-2"
              >
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.target ?? (external ? "_blank" : undefined)}
                    rel={external ? "noopener noreferrer" : undefined}
                  >
                    {body}
                  </a>
                ) : (
                  body
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
