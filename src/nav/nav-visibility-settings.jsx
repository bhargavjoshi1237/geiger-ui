"use client";

// <NavVisibilitySettings> — the shared "choose what's in my sidebar" surface.
//
// Every Geiger product drops this into a settings screen and passes four things:
// its nav tree, its geiger-ui.config.js, the user's hidden titles, and an
// onToggle that persists. All the dependency reasoning lives in ./resolve.js, so
// this component only renders the model it gets back.
//
// One grid of section cards, each carrying its own switch. Most sections in a
// product's nav are a single screen with nothing under them, so a rail that only
// picks a target for a second pane spends the whole panel saying "this one is
// just a switch" — and costs two clicks to flip it. Here every section toggles
// where it sits, and only the sections that actually have screens under them
// expand, in place, to show them.
//
// A blocked switch is never silently overridden: it is disabled, and its row
// names the entries blocking it as chips that jump straight to them.

import * as React from "react";
import { ChevronDown, EyeOff, Info, Lock, RotateCcw, Search } from "lucide-react";

import { cn } from "../lib/utils.js";
import { Button } from "../ui/button.jsx";
import { ExpandableSearch } from "../ui/expandable-search.jsx";
import { SegmentedTabs } from "../ui/segmented-tabs.jsx";
import { Switch } from "../ui/switch.jsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip.jsx";
import { EMPTY_NAV_CONFIG } from "./nav-config.js";
import { navVisibilityModel } from "./resolve.js";

const FILTERS = ["all", "shown", "hidden", "locked"];

const FILTER_LABELS = {
  all: "All",
  shown: "Shown",
  hidden: "Hidden",
  locked: "Always on",
};

function matchesFilter(item, filter) {
  if (filter === "shown") return !item.hidden;
  if (filter === "hidden") return item.hidden;
  if (filter === "locked") return item.locked;
  return true;
}

// Searching a section by name means "show me that section", so a title hit
// carries its whole roster through rather than filtering it down to itself.
function sectionRows(section, filter, needle) {
  const sectionHit = Boolean(needle) && section.title.toLowerCase().includes(needle);
  return section.subItems.filter(
    (sub) =>
      matchesFilter(sub, filter) &&
      (!needle || sectionHit || sub.title.toLowerCase().includes(needle)),
  );
}

function isListed(section, filter, needle) {
  const sectionHit = !needle || section.title.toLowerCase().includes(needle);
  if (matchesFilter(section, filter) && sectionHit) return true;
  return sectionRows(section, filter, needle).length > 0;
}

// --- Controls ----------------------------------------------------------------

// Locked entries drop the switch entirely. A permanently-on control that refuses
// every click is the thing people ask about; a lock says the same in one glance.
function VisibilityToggle({ item, busy, onToggle }) {
  if (item.locked) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex h-5 shrink-0 cursor-help items-center gap-1 rounded-md border border-border bg-surface-card px-1.5 text-[10px] font-medium text-text-tertiary">
            <Lock className="h-2.5 w-2.5" />
            On
          </span>
        </TooltipTrigger>
        <TooltipContent side="left" className="max-w-[260px] text-xs">
          {`${item.title} is always available and can't be hidden.`}
        </TooltipContent>
      </Tooltip>
    );
  }

  const control = (
    <span className="inline-flex shrink-0">
      <Switch
        checked={!item.hidden}
        disabled={busy || !item.canToggle}
        onCheckedChange={(next) => onToggle(item.title, !next)}
        aria-label={`${item.hidden ? "Show" : "Hide"} ${item.title}`}
      />
    </span>
  );

  if (item.canToggle) return control;

  // A disabled switch has no hover target of its own, so the tooltip wraps a
  // span rather than the control.
  return (
    <Tooltip>
      <TooltipTrigger asChild>{control}</TooltipTrigger>
      <TooltipContent side="left" className="max-w-[260px] text-xs">
        {item.blockedReason}
      </TooltipContent>
    </Tooltip>
  );
}

// Why this row won't move, with the entries responsible as chips — the fix is
// always "go deal with that other entry", so the note is the way there.
function BlockedNote({ item, onJump }) {
  if (item.locked || item.canToggle) return null;

  const blockers = item.blockers || [];
  if (blockers.length === 0) {
    return (
      <p className="mt-1.5 text-[11px] leading-relaxed text-text-tertiary">
        {item.blockedReason}
      </p>
    );
  }

  return (
    <p className="mt-1.5 flex flex-wrap items-center gap-1 text-[11px] text-text-tertiary">
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex cursor-help items-center">
            <Info className="h-3 w-3" />
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[260px] text-xs">
          {item.blockedReason}
        </TooltipContent>
      </Tooltip>
      <span>{item.hidden ? "Needs" : "Needed by"}</span>
      {blockers.map((title) => (
        <button
          key={title}
          type="button"
          onClick={() => onJump(title)}
          className="rounded border border-border bg-surface-card px-1.5 py-px font-medium text-text-secondary transition-colors hover:border-border-strong hover:text-foreground"
        >
          {title}
        </button>
      ))}
    </p>
  );
}

function ScreenMeter({ shown, total }) {
  const pct = total ? Math.round((shown / total) * 100) : 0;
  return (
    <div className="mt-3.5 space-y-1.5">
      <div className="h-1 overflow-hidden rounded-full bg-surface-hover">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-[11px] tabular-nums text-text-tertiary">
        {shown} of {total} screens in your sidebar
      </p>
    </div>
  );
}

// --- Section card -----------------------------------------------------------

function SectionMeta({ section }) {
  const total = section.subItems.length;
  if (section.hidden) {
    return (
      <span className="text-[11px] font-medium uppercase tracking-wide text-text-tertiary">
        Hidden
      </span>
    );
  }
  if (total === 0) return null;
  const shown = section.subItems.filter((sub) => !sub.hidden).length;
  return (
    <span className="text-[11px] tabular-nums text-text-tertiary">
      {shown}/{total} screens
    </span>
  );
}

function ScreenRow({ item, section, busy, flash, onToggle, onJump, registerRow }) {
  return (
    <div
      ref={(el) => registerRow(item.title, el)}
      className={cn(
        "flex items-start gap-3 py-2.5 pl-11 pr-4 transition-colors",
        flash === item.title && "bg-primary/10",
      )}
    >
      <div className="min-w-0 flex-1">
        <span
          className={cn(
            "text-[13px]",
            item.hidden ? "text-text-tertiary" : "text-foreground",
          )}
        >
          {item.title}
        </span>
        {item.shadowed ? (
          <p className="mt-0.5 text-[11px] text-text-tertiary">
            Hidden with {section.title}
          </p>
        ) : null}
        <BlockedNote item={item} onJump={onJump} />
      </div>
      <VisibilityToggle item={item} busy={busy} onToggle={onToggle} />
    </div>
  );
}

function SectionCard({
  section,
  rows,
  filter,
  busy,
  flash,
  expanded,
  onExpand,
  onToggle,
  onJump,
  registerRow,
}) {
  const Icon = section.icon;
  const total = section.subItems.length;
  const shown = section.subItems.filter((sub) => !sub.hidden).length;
  const hasScreens = total > 0;

  return (
    <div
      ref={(el) => registerRow(section.title, el)}
      className={cn(
        "overflow-hidden rounded-xl border bg-surface-subtle transition-colors",
        flash === section.title ? "border-primary/40 bg-primary/10" : "border-border",
      )}
    >
      <div className="flex items-start gap-3 p-4">
        {Icon ? (
          <span
            className={cn(
              "mt-px flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-card",
              section.hidden ? "text-text-tertiary" : "text-text-secondary",
            )}
          >
            <Icon className="h-4 w-4" />
          </span>
        ) : null}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span
              className={cn(
                "text-[13px] font-medium",
                section.hidden ? "text-text-tertiary" : "text-foreground",
              )}
            >
              {section.title}
            </span>
            <SectionMeta section={section} />
          </div>
          <BlockedNote item={section} onJump={onJump} />
          {hasScreens && !section.hidden ? (
            <ScreenMeter shown={shown} total={total} />
          ) : null}
        </div>

        <VisibilityToggle item={section} busy={busy} onToggle={onToggle} />
      </div>

      {hasScreens ? (
        <>
          <button
            type="button"
            onClick={() => onExpand(section.title, !expanded)}
            aria-expanded={expanded}
            className="flex w-full items-center justify-center gap-1.5 border-t border-border py-2 text-[11px] font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-foreground"
          >
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-200",
                expanded ? "rotate-0" : "-rotate-90",
              )}
            />
            {expanded ? "Hide screens" : `${total} ${total === 1 ? "screen" : "screens"}`}
          </button>

          {expanded ? (
            <div className="border-t border-border">
              {section.hidden ? (
                <div className="flex items-start gap-2 border-b border-border bg-surface-card px-4 py-2.5 text-[11px] leading-relaxed text-text-tertiary">
                  <EyeOff className="mt-0.5 h-3 w-3 shrink-0" />
                  <p>
                    {section.title} is hidden, so none of these reach your
                    sidebar. Their own switches are remembered for when you show
                    it again.
                  </p>
                </div>
              ) : null}

              {rows.length === 0 ? (
                <p className="px-4 py-6 text-center text-xs text-text-tertiary">
                  No screen here is {FILTER_LABELS[filter].toLowerCase()}.
                </p>
              ) : (
                <div className="divide-y divide-border">
                  {rows.map((sub) => (
                    <ScreenRow
                      key={sub.title}
                      item={sub}
                      section={section}
                      busy={busy}
                      flash={flash}
                      onToggle={onToggle}
                      onJump={onJump}
                      registerRow={registerRow}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

// --- Surface -----------------------------------------------------------------

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
  const [filter, setFilter] = React.useState("all");
  const [opened, setOpened] = React.useState(() => new Set());
  const [flash, setFlash] = React.useState("");

  const model = React.useMemo(
    () => navVisibilityModel({ nav, hidden, config }),
    [nav, hidden, config],
  );

  const needle = query.trim().toLowerCase();

  const sections = React.useMemo(
    () => model.sections.filter((section) => isListed(section, filter, needle)),
    [model.sections, filter, needle],
  );

  // A narrowed view opens every card: the matches are the point, and leaving
  // them folded away behind a chevron would read as "no results".
  const narrowing = Boolean(needle) || filter !== "all";

  const rowsFor = React.useCallback(
    (section) => sectionRows(section, filter, needle),
    [filter, needle],
  );

  const counts = React.useMemo(() => {
    const tally = { all: 0, shown: 0, hidden: 0, locked: 0 };
    const count = (item) => {
      tally.all += 1;
      FILTERS.forEach((key) => {
        if (key !== "all" && matchesFilter(item, key)) tally[key] += 1;
      });
    };
    model.sections.forEach((section) => {
      count(section);
      section.subItems.forEach(count);
    });
    return tally;
  }, [model.sections]);

  const tabs = React.useMemo(
    () =>
      FILTERS.map((value) => ({
        value,
        label: `${FILTER_LABELS[value]} ${counts[value]}`,
      })),
    [counts],
  );

  // title -> the section it lives under, so a blocker chip knows where to go.
  const ownerOf = React.useMemo(() => {
    const map = new Map();
    model.sections.forEach((section) => {
      map.set(section.title, section.title);
      section.subItems.forEach((sub) => map.set(sub.title, section.title));
    });
    return map;
  }, [model.sections]);

  const rowRefs = React.useRef(new Map());
  const registerRow = React.useCallback((title, el) => {
    if (el) rowRefs.current.set(title, el);
    else rowRefs.current.delete(title);
  }, []);

  // Jumping clears the filter and the query first: landing on an entry the
  // current view excludes would look like the chip did nothing.
  const jumpTo = React.useCallback(
    (title) => {
      const owner = ownerOf.get(title);
      if (!owner) return;
      setQuery("");
      setFilter("all");
      setOpened((current) => new Set(current).add(owner));
      setFlash(title);
    },
    [ownerOf],
  );

  React.useEffect(() => {
    if (!flash) return undefined;
    rowRefs.current
      .get(flash)
      ?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    const id = setTimeout(() => setFlash(""), 1800);
    return () => clearTimeout(id);
  }, [flash]);

  const handleExpand = React.useCallback((title, next) => {
    setOpened((current) => {
      const draft = new Set(current);
      if (next) draft.add(title);
      else draft.delete(title);
      return draft;
    });
  }, []);

  return (
    <TooltipProvider>
      <div className={cn("space-y-4", className)}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SegmentedTabs tabs={tabs} value={filter} onChange={setFilter} />

          <div className="flex items-center gap-2 sm:ml-auto">
            {/* Only offered when there is something to undo — its absence is the
                "you're seeing everything" signal. */}
            {onReset && model.hiddenCount > 0 ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onReset}
                disabled={busy}
                className="h-8 gap-1.5 px-2 text-xs text-text-secondary hover:bg-surface-hover hover:text-foreground"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Show all
              </Button>
            ) : null}

            <ExpandableSearch
              value={query}
              onChange={setQuery}
              placeholder="Search navigation…"
              label="Search navigation"
            />
          </div>
        </div>

        {sections.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-surface-subtle px-5 py-14 text-center">
            <Search className="mx-auto h-5 w-5 text-text-tertiary" />
            <p className="mt-3 text-sm text-text-secondary">
              Nothing here matches {needle ? `“${query.trim()}”` : "this filter"}.
            </p>
          </div>
        ) : (
          <div className="grid items-start gap-3 xl:grid-cols-2">
            {sections.map((section) => (
              <SectionCard
                key={section.title}
                section={section}
                rows={rowsFor(section)}
                filter={filter}
                busy={busy}
                flash={flash}
                expanded={narrowing || opened.has(section.title)}
                onExpand={handleExpand}
                onToggle={onToggle}
                onJump={jumpTo}
                registerRow={registerRow}
              />
            ))}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}

export default NavVisibilitySettings;
