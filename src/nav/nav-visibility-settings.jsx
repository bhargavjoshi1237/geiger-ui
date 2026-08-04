"use client";

// <NavVisibilitySettings> — the shared "choose what's in my sidebar" surface.
//
// Every Geiger product drops this into a settings screen and passes four things:
// its nav tree, its geiger-ui.config.js, the user's hidden titles, and an
// onToggle that persists. All the dependency reasoning lives in ./resolve.js, so
// this component only renders the model it gets back.
//
// A blocked switch is disabled and explains itself on hover; the change is never
// applied silently in either direction.

import * as React from "react";
import { ChevronDown, Eye, EyeOff, Lock, RotateCcw, Search } from "lucide-react";

import { cn } from "../lib/utils.js";
import { Badge } from "../ui/badge.jsx";
import { Button } from "../ui/button.jsx";
import { Input } from "../ui/input.jsx";
import { Switch } from "../ui/switch.jsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip.jsx";
import { EMPTY_NAV_CONFIG } from "./nav-config.js";
import { navVisibilityModel } from "./resolve.js";

function matches(query, section) {
  if (!query) return true;
  const needle = query.toLowerCase();
  return (
    section.title.toLowerCase().includes(needle) ||
    section.subItems.some((sub) => sub.title.toLowerCase().includes(needle))
  );
}

// One switch plus its explanation. Disabled switches still need a hover target,
// so the tooltip wraps a span rather than the control itself.
function VisibilityToggle({ item, busy, onToggle }) {
  const control = (
    <span className="inline-flex">
      <Switch
        checked={!item.hidden}
        disabled={busy || !item.canToggle}
        onCheckedChange={(next) => onToggle(item.title, !next)}
        aria-label={`${item.hidden ? "Show" : "Hide"} ${item.title}`}
      />
    </span>
  );

  if (item.canToggle && !item.locked) return control;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{control}</TooltipTrigger>
      <TooltipContent side="left" className="max-w-[260px] text-xs">
        {item.blockedReason || `${item.title} is always available.`}
      </TooltipContent>
    </Tooltip>
  );
}

function DependencyHints({ item }) {
  if (item.requires.length === 0 && item.requiredBy.length === 0) return null;

  return (
    <div className="mt-1 flex flex-wrap items-center gap-1.5">
      {item.requires.length > 0 ? (
        <Badge className="h-4 border-border bg-surface-card px-1.5 text-[10px] font-normal text-text-tertiary">
          needs {item.requires.join(", ")}
        </Badge>
      ) : null}
      {item.requiredBy.length > 0 ? (
        <Badge className="h-4 border-border bg-surface-card px-1.5 text-[10px] font-normal text-text-tertiary">
          needed by {item.requiredBy.join(", ")}
        </Badge>
      ) : null}
    </div>
  );
}

function SubItemRow({ item, busy, onToggle }) {
  const Icon = item.icon;
  return (
    <div className="flex items-center gap-3 py-2 pl-11 pr-5">
      {Icon ? (
        <Icon
          className={cn(
            "h-3.5 w-3.5 shrink-0",
            item.hidden ? "text-text-tertiary" : "text-text-secondary",
          )}
        />
      ) : null}
      <div className="min-w-0 flex-1">
        <span
          className={cn(
            "text-[13px]",
            item.hidden ? "text-text-tertiary line-through" : "text-foreground",
          )}
        >
          {item.title}
        </span>
        {item.shadowed ? (
          <span className="ml-2 text-[10px] text-text-tertiary">
            hidden with its section
          </span>
        ) : null}
        <DependencyHints item={item} />
      </div>
      <VisibilityToggle item={item} busy={busy} onToggle={onToggle} />
    </div>
  );
}

function SectionCard({ section, busy, onToggle, defaultExpanded }) {
  const [expanded, setExpanded] = React.useState(defaultExpanded);
  const Icon = section.icon;
  const hiddenSubs = section.subItems.filter((sub) => sub.hidden).length;

  return (
    <div className="rounded-xl border border-border bg-surface-subtle">
      <div className="flex items-center gap-3 px-5 py-3.5">
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border",
            section.hidden ? "bg-background" : "bg-surface-card",
          )}
        >
          {Icon ? (
            <Icon
              className={cn(
                "h-4 w-4",
                section.hidden ? "text-text-tertiary" : "text-foreground",
              )}
            />
          ) : null}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "text-[14px] font-medium",
                section.hidden ? "text-text-tertiary line-through" : "text-foreground",
              )}
            >
              {section.title}
            </span>
            {section.locked ? (
              <Badge className="h-4 gap-1 border-border bg-surface-card px-1.5 text-[9px] font-medium text-text-tertiary">
                <Lock className="h-2.5 w-2.5" />
                Always on
              </Badge>
            ) : null}
            {hiddenSubs > 0 && !section.hidden ? (
              <Badge className="h-4 border-border bg-surface-card px-1.5 text-[9px] font-medium text-text-tertiary">
                {hiddenSubs} of {section.subItems.length} hidden
              </Badge>
            ) : null}
          </div>
          <DependencyHints item={section} />
        </div>

        {section.subItems.length > 0 ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setExpanded((v) => !v)}
            aria-label={`${expanded ? "Collapse" : "Expand"} ${section.title}`}
            className="h-7 gap-1 px-2 text-[11px] text-text-secondary hover:bg-surface-hover"
          >
            {section.subItems.length}
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-transform",
                expanded && "rotate-180",
              )}
            />
          </Button>
        ) : null}

        <VisibilityToggle item={section} busy={busy} onToggle={onToggle} />
      </div>

      {expanded && section.subItems.length > 0 ? (
        <div className="divide-y divide-border border-t border-border">
          {section.subItems.map((sub) => (
            <SubItemRow key={sub.title} item={sub} busy={busy} onToggle={onToggle} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function NavVisibilitySettings({
  nav = [],
  config = EMPTY_NAV_CONFIG,
  hidden = [],
  onToggle = () => {},
  onReset = null,
  busy = false,
  className,
}) {
  const [query, setQuery] = React.useState("");

  const model = React.useMemo(
    () => navVisibilityModel({ nav, hidden, config }),
    [nav, hidden, config],
  );

  const sections = React.useMemo(
    () => model.sections.filter((section) => matches(query, section)),
    [model.sections, query],
  );

  const visibleCount = model.total - model.hiddenCount;

  return (
    <TooltipProvider>
      <div className={cn("space-y-4", className)}>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-tertiary" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search navigation…"
              className="h-9 border-border bg-surface-card pl-9 text-sm"
            />
          </div>

          <div className="flex items-center gap-3 text-[11px] text-text-secondary">
            <span className="flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5 text-emerald-400" />
              {visibleCount} shown
            </span>
            <span className="flex items-center gap-1.5">
              <EyeOff className="h-3.5 w-3.5 text-text-tertiary" />
              {model.hiddenCount} hidden
            </span>
          </div>

          {onReset ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onReset}
              disabled={busy || model.hiddenCount === 0}
              className="h-9 gap-1.5 px-3 text-xs text-text-secondary hover:bg-surface-hover"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Show all
            </Button>
          ) : null}
        </div>

        {sections.length === 0 ? (
          <div className="rounded-xl border border-border bg-surface-subtle px-5 py-10 text-center">
            <p className="text-sm text-text-secondary">
              Nothing matches “{query}”.
            </p>
          </div>
        ) : (
          <div className="grid gap-2">
            {sections.map((section) => (
              <SectionCard
                key={section.title}
                section={section}
                busy={busy}
                onToggle={onToggle}
                defaultExpanded={Boolean(query)}
              />
            ))}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}

export default NavVisibilitySettings;
