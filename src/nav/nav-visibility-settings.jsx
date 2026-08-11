"use client";

// <NavVisibilitySettings> — the shared "choose what's in my sidebar" surface.
//
// Every Geiger product drops this into a settings screen and passes four things:
// its nav tree, its geiger-ui.config.js, the user's hidden titles, and an
// onToggle that persists. All the dependency reasoning lives in ./resolve.js, so
// this component only renders the model it gets back.
//
// Two panes, not one list. A product's nav runs to twenty-odd sections over a
// hundred-odd screens; a single list that expands inline turns curating one
// section into a scroll hunt, and crowds every row with a count, a chevron, a
// footnote and a switch at once. Here the rail picks a section and the panel
// edits it, so only one section's screens are ever on screen — the rail row
// carries a count, the panel row carries the switch, and neither carries both.
//
// A blocked switch is never silently overridden: it is disabled, and its row
// names the entries blocking it as chips that jump straight to them.

import * as React from "react";
import { ChevronRight, EyeOff, Info, Lock, RotateCcw } from "lucide-react";

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

// --- Rail --------------------------------------------------------------------

function RailMeta({ section }) {
  if (section.hidden) {
    return (
      <span className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-text-tertiary">
        Hidden
      </span>
    );
  }
  if (section.subItems.length > 0) {
    const shown = section.subItems.filter((sub) => !sub.hidden).length;
    return (
      <span className="shrink-0 text-[11px] tabular-nums text-text-tertiary">
        {shown}/{section.subItems.length}
      </span>
    );
  }
  if (section.locked) {
    return <Lock className="h-3 w-3 shrink-0 text-text-tertiary" />;
  }
  return null;
}

function SectionRail({ sections, activeTitle, flash, onSelect, registerRow }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface-subtle lg:sticky lg:top-4">
      <div className="max-h-[26rem] overflow-y-auto lg:max-h-[calc(100vh-13rem)]">
        {sections.length === 0 ? (
          <p className="px-4 py-10 text-center text-xs text-text-tertiary">
            No section matches.
          </p>
        ) : (
          sections.map((section) => {
            const active = section.title === activeTitle;
            const Icon = section.icon;
            return (
              <button
                key={section.title}
                type="button"
                ref={(el) => registerRow(section.title, el)}
                onClick={() => onSelect(section.title)}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "relative flex w-full items-center gap-2.5 border-b border-border px-3 py-2.5 text-left transition-colors last:border-b-0",
                  active ? "bg-surface-active" : "hover:bg-surface-hover",
                  flash === section.title && "bg-primary/10",
                )}
              >
                {active ? (
                  <span className="absolute inset-y-0 left-0 w-0.5 bg-primary" />
                ) : null}
                {Icon ? (
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      section.hidden ? "text-text-tertiary" : "text-text-secondary",
                    )}
                  />
                ) : null}
                <span
                  className={cn(
                    "min-w-0 flex-1 truncate text-[13px] font-medium",
                    section.hidden ? "text-text-tertiary" : "text-foreground",
                  )}
                >
                  {section.title}
                </span>
                <RailMeta section={section} />
                <ChevronRight
                  className={cn(
                    "h-3.5 w-3.5 shrink-0 transition-colors",
                    active ? "text-text-secondary" : "text-text-tertiary/60",
                  )}
                />
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

// --- Detail panel ------------------------------------------------------------

function ScreenRow({ item, section, busy, flash, onToggle, onJump, registerRow }) {
  return (
    <div
      ref={(el) => registerRow(item.title, el)}
      className={cn(
        "flex items-start gap-3 px-5 py-3 transition-colors",
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

function SectionDetail({
  section,
  rows,
  filter,
  busy,
  flash,
  onToggle,
  onJump,
  registerRow,
}) {
  if (!section) {
    return (
      <div className="rounded-xl border border-border bg-surface-subtle px-5 py-16 text-center">
        <p className="text-sm text-text-secondary">
          Pick a section to choose what it puts in your sidebar.
        </p>
      </div>
    );
  }

  const Icon = section.icon;
  const total = section.subItems.length;
  const shown = section.subItems.filter((sub) => !sub.hidden).length;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface-subtle">
      <div className="border-b border-border px-5 py-4">
        <div className="flex items-start gap-3">
          {Icon ? (
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-card text-text-secondary">
              <Icon className="h-4 w-4" />
            </span>
          ) : null}
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold text-foreground">
              {section.title}
            </h3>
            <p className="mt-0.5 text-xs text-text-secondary">
              {total > 0
                ? `${total} ${total === 1 ? "screen" : "screens"} in this section`
                : "A single screen with nothing under it"}
            </p>
            <BlockedNote item={section} onJump={onJump} />
          </div>
          <VisibilityToggle item={section} busy={busy} onToggle={onToggle} />
        </div>
        {total > 0 && !section.hidden ? (
          <ScreenMeter shown={shown} total={total} />
        ) : null}
      </div>

      {section.hidden && total > 0 ? (
        <div className="flex items-start gap-2 border-b border-border bg-surface-card px-5 py-2.5 text-[11px] leading-relaxed text-text-tertiary">
          <EyeOff className="mt-0.5 h-3 w-3 shrink-0" />
          <p>
            {section.title} is hidden, so none of these reach your sidebar. Their
            own switches are remembered for when you show it again.
          </p>
        </div>
      ) : null}

      {total === 0 ? (
        <p className="px-5 py-10 text-center text-xs text-text-tertiary">
          {section.title} is one screen on its own — its switch is above.
        </p>
      ) : rows.length === 0 ? (
        <p className="px-5 py-10 text-center text-xs text-text-tertiary">
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
  const [selected, setSelected] = React.useState("");
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

  // Falling back to the first listed section keeps the panel populated when a
  // filter or a search drops whatever was open, without a reconciling effect.
  const active =
    sections.find((section) => section.title === selected) || sections[0] || null;

  const rows = React.useMemo(
    () => (active ? sectionRows(active, filter, needle) : []),
    [active, filter, needle],
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
      setSelected(owner);
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
  }, [flash, active]);

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

        <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
          <SectionRail
            sections={sections}
            activeTitle={active?.title || ""}
            flash={flash}
            onSelect={setSelected}
            registerRow={registerRow}
          />
          <SectionDetail
            section={active}
            rows={rows}
            filter={filter}
            busy={busy}
            flash={flash}
            onToggle={onToggle}
            onJump={jumpTo}
            registerRow={registerRow}
          />
        </div>
      </div>
    </TooltipProvider>
  );
}

export default NavVisibilitySettings;
