"use client";

import * as React from "react";
import { Search, CornerDownLeft, SearchX, History } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";

import { cn } from "../lib/utils";
import { DialogOverlay, DialogPortal } from "./dialog";
import { Kbd, KbdGroup } from "./kbd";

// Suite-wide search palette (⌘K). Takes a sidebar nav tree — the same
// `[{ title, icon, subItems: [{ title, icon }] }]` shape every product feeds its
// sidebar — flattens it to destinations, and fuzzy-matches as you type. Extra
// non-nav entries can be appended through `items`. Purely presentational: it
// hands the chosen entry back via `onSelect` and the app does the navigating.

// Fuzzy match with character positions so the result row can highlight the hit.
// Returns null when the query isn't a subsequence of the text; higher scores
// favour prefixes, word starts and runs of consecutive characters.
function fuzzyScore(text, query) {
  const haystack = String(text || "").toLowerCase();
  if (!query) return { score: 0, indices: [] };
  if (!haystack) return null;

  const indices = [];
  let cursor = 0;
  let score = 0;
  let run = 0;

  for (let qi = 0; qi < query.length; qi += 1) {
    const found = haystack.indexOf(query[qi], cursor);
    if (found === -1) return null;
    if (found === 0) score += 12;
    else if (/[\s\-_/&.,()]/.test(haystack[found - 1])) score += 8;
    if (found === cursor && qi > 0) {
      run += 1;
      score += 5 + run;
    } else {
      run = 0;
    }
    score += 1;
    indices.push(found);
    cursor = found + 1;
  }

  if (haystack.startsWith(query)) score += 25;
  if (haystack === query) score += 40;
  score += Math.max(0, 10 - Math.floor(haystack.length / 4)); // prefer short titles
  return { score, indices };
}

// A parent with subItems is a group header, not a destination — the sidebar only
// expands it — so only leaves become searchable entries.
function flattenNav(nav, rootLabel) {
  const entries = [];
  for (const item of nav || []) {
    const subItems = item.subItems || [];
    if (subItems.length) {
      for (const sub of subItems) {
        entries.push({
          id: `${item.title}/${sub.title}`,
          title: sub.title,
          group: item.title,
          icon: sub.icon || item.icon,
          keywords: sub.keywords || "",
          item: sub,
          parent: item,
        });
      }
    } else {
      entries.push({
        id: item.title,
        title: item.title,
        group: rootLabel,
        icon: item.icon,
        keywords: item.keywords || "",
        item,
        parent: null,
      });
    }
  }
  return entries;
}

function normalizeItems(items, rootLabel) {
  return (items || []).map((entry) => ({
    id: entry.id || `${entry.group || rootLabel}/${entry.title}`,
    title: entry.title,
    group: entry.group || rootLabel,
    icon: entry.icon,
    keywords: entry.keywords || "",
    item: entry.item ?? entry,
    parent: null,
    onSelect: entry.onSelect,
  }));
}

function readRecents(key) {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(key));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Matched characters read a shade stronger than the rest of the title.
function Highlight({ text, indices }) {
  if (!indices || indices.length === 0) return text;
  const hit = new Set(indices);
  return Array.from(text).map((char, i) =>
    hit.has(i) ? (
      <mark
        key={i}
        className="bg-transparent p-0 font-semibold text-foreground"
      >
        {char}
      </mark>
    ) : (
      <React.Fragment key={i}>{char}</React.Fragment>
    ),
  );
}

// The body only exists while the dialog is open (Radix unmounts closed portal
// content), so every opening starts from a clean query and fresh recents without
// a reset effect.
function CommandPaletteBody({
  onOpenChange,
  nav,
  items,
  onSelect,
  placeholder,
  rootGroupLabel,
  recentsKey,
  showRecents,
  maxResults,
  emptyMessage,
  emptyHint,
}) {
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const [recents] = React.useState(() =>
    showRecents ? readRecents(recentsKey) : [],
  );
  const rowRefs = React.useRef([]);
  const listRef = React.useRef(null);
  const domId = React.useId();
  const listId = `${domId}-list`;
  const optionId = (index) => `${domId}-option-${index}`;

  const pool = React.useMemo(
    () => [
      ...flattenNav(nav, rootGroupLabel),
      ...normalizeItems(items, rootGroupLabel),
    ],
    [nav, items, rootGroupLabel],
  );

  // Idle: recents then the full tree, grouped. Searching: one ranked flat list —
  // grouping ranked hits would bury the best match under a section header.
  const sections = React.useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) {
      const grouped = [];
      const recentEntries = recents
        .map((id) => pool.find((entry) => entry.id === id))
        .filter(Boolean)
        .slice(0, 5);
      if (recentEntries.length) {
        grouped.push({ key: "__recent", label: "Recent", items: recentEntries });
      }
      const byGroup = new Map();
      for (const entry of pool) {
        if (!byGroup.has(entry.group)) byGroup.set(entry.group, []);
        byGroup.get(entry.group).push(entry);
      }
      for (const [label, groupItems] of byGroup) {
        grouped.push({ key: label, label, items: groupItems });
      }
      return grouped;
    }

    const scored = [];
    for (const entry of pool) {
      const onTitle = fuzzyScore(entry.title, q);
      const onGroup = entry.group ? fuzzyScore(entry.group, q) : null;
      const onKeywords = entry.keywords ? fuzzyScore(entry.keywords, q) : null;
      const score = Math.max(
        onTitle ? onTitle.score : 0,
        onGroup ? onGroup.score * 0.45 : 0,
        onKeywords ? onKeywords.score * 0.35 : 0,
      );
      if (!onTitle && !onGroup && !onKeywords) continue;
      scored.push({ ...entry, score, indices: onTitle ? onTitle.indices : [] });
    }
    scored.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
    if (!scored.length) return [];
    return [
      {
        key: "__results",
        label: `${scored.length} result${scored.length === 1 ? "" : "s"}`,
        items: scored.slice(0, maxResults),
      },
    ];
  }, [query, pool, recents, maxResults]);

  const flat = React.useMemo(
    () => sections.flatMap((section) => section.items),
    [sections],
  );

  React.useEffect(() => {
    rowRefs.current[active]?.scrollIntoView({ block: "nearest" });
  }, [active, sections]);

  // A new query re-ranks everything — highlight the top hit and scroll back up.
  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    setActive(0);
    if (listRef.current) listRef.current.scrollTop = 0;
  };

  const handleSelect = (entry) => {
    if (!entry) return;
    if (showRecents) {
      try {
        const next = [
          entry.id,
          ...readRecents(recentsKey).filter((id) => id !== entry.id),
        ].slice(0, 5);
        window.localStorage.setItem(recentsKey, JSON.stringify(next));
      } catch {
        // Storage can be unavailable (private mode) — recents are a nicety.
      }
    }
    onOpenChange?.(false);
    if (entry.onSelect) entry.onSelect(entry);
    else onSelect?.(entry.item ?? entry, entry);
  };

  const handleKeyDown = (event) => {
    if (!flat.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (i + 1) % flat.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (i - 1 + flat.length) % flat.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActive(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActive(flat.length - 1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      handleSelect(flat[active]);
    }
  };

  let cursor = -1; // running index across sections, matched to `flat`

  return (
    <>
      <div className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-4">
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <input
          value={query}
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          aria-label="Search"
          role="combobox"
          aria-expanded
          aria-controls={listId}
          aria-activedescendant={flat.length ? optionId(active) : undefined}
          className="h-full w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <Kbd className="hidden shrink-0 border border-border bg-surface-card px-1.5 text-muted-foreground sm:inline-flex">
          Esc
        </Kbd>
      </div>

      <div
        ref={listRef}
        id={listId}
        role="listbox"
        aria-label="Search results"
        className="max-h-[min(24rem,55vh)] overflow-y-auto overscroll-contain p-2 [scrollbar-color:var(--scrollbar-thumb)_transparent] [scrollbar-width:thin]"
      >
        {sections.length === 0 ? (
          <div className="flex flex-col items-center gap-1 px-4 py-12 text-center">
            <SearchX className="mb-1 size-5 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground">
              {emptyMessage}
            </p>
            <p className="text-xs text-muted-foreground">{emptyHint}</p>
          </div>
        ) : (
          sections.map((section) => (
            <div key={section.key} className="mb-1 last:mb-0">
              <div className="flex items-center gap-1.5 px-2 pt-2 pb-1.5 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                {section.key === "__recent" && <History className="size-3" />}
                {section.label}
              </div>
              {section.items.map((entry) => {
                cursor += 1;
                const index = cursor;
                const isActive = index === active;
                const Icon = entry.icon;
                return (
                  <button
                    key={`${section.key}:${entry.id}`}
                    id={optionId(index)}
                    ref={(el) => {
                      rowRefs.current[index] = el;
                    }}
                    type="button"
                    role="option"
                    tabIndex={-1}
                    aria-selected={isActive}
                    onClick={() => handleSelect(entry)}
                    onPointerMove={() => setActive(index)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors",
                      isActive ? "bg-surface-active" : "bg-transparent",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-md border transition-colors",
                        isActive
                          ? "border-border-strong bg-surface-strong text-foreground"
                          : "border-border bg-surface-card text-muted-foreground",
                      )}
                    >
                      {Icon ? (
                        <Icon className="size-3.5" strokeWidth={2} />
                      ) : (
                        <Search className="size-3.5" strokeWidth={2} />
                      )}
                    </span>
                    <span
                      className={cn(
                        "min-w-0 flex-1 truncate text-sm",
                        isActive ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      <Highlight text={entry.title} indices={entry.indices} />
                    </span>
                    {entry.group && entry.group !== entry.title && (
                      <span className="hidden shrink-0 text-xs text-text-secondary sm:inline">
                        {entry.group}
                      </span>
                    )}
                    <CornerDownLeft
                      className={cn(
                        "size-3.5 shrink-0 text-muted-foreground transition-opacity",
                        isActive ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </button>
                );
              })}
            </div>
          ))
        )}
      </div>

      <div className="flex h-10 shrink-0 items-center gap-4 border-t border-border bg-background px-3 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <KbdGroup>
            <Kbd className="border border-border bg-surface-card text-muted-foreground">
              ↑
            </Kbd>
            <Kbd className="border border-border bg-surface-card text-muted-foreground">
              ↓
            </Kbd>
          </KbdGroup>
          Navigate
        </span>
        <span className="flex items-center gap-1.5">
          <Kbd className="border border-border bg-surface-card text-muted-foreground">
            ↵
          </Kbd>
          Open
        </span>
        <span className="ml-auto flex items-center gap-1.5">
          <Kbd className="border border-border bg-surface-card text-muted-foreground">
            Esc
          </Kbd>
          Close
        </span>
      </div>
    </>
  );
}

export function CommandPalette({
  open,
  onOpenChange,
  nav = [],
  items = [],
  onSelect,
  placeholder = "Search…",
  rootGroupLabel = "Workspace",
  recentsKey = "geiger:palette:recents",
  showRecents = true,
  maxResults = 40,
  emptyMessage = "No matches",
  emptyHint = "Try a different word, or check your spelling.",
  className,
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-black/60 backdrop-blur-[2px]" />
        <DialogPrimitive.Content
          data-slot="command-palette"
          onOpenAutoFocus={(event) => {
            // Radix would focus the content box; the query field is the point.
            event.preventDefault();
            event.currentTarget.querySelector("input")?.focus();
          }}
          className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            // font-sans is explicit: the portal renders on document.body, outside
            // whatever shell element the app puts its font class on.
            "fixed top-[14vh] left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 flex-col overflow-hidden rounded-xl border border-border bg-surface-subtle font-sans shadow-2xl duration-150 outline-none",
            className,
          )}
        >
          <DialogPrimitive.Title className="sr-only">
            Search
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Search across the workspace navigation.
          </DialogPrimitive.Description>
          <CommandPaletteBody
            onOpenChange={onOpenChange}
            nav={nav}
            items={items}
            onSelect={onSelect}
            placeholder={placeholder}
            rootGroupLabel={rootGroupLabel}
            recentsKey={recentsKey}
            showRecents={showRecents}
            maxResults={maxResults}
            emptyMessage={emptyMessage}
            emptyHint={emptyHint}
          />
        </DialogPrimitive.Content>
      </DialogPortal>
    </DialogPrimitive.Root>
  );
}

// "⌘" on macOS, "Ctrl" everywhere else. Read through useSyncExternalStore so the
// server renders the non-mac label and hydration swaps it without a mismatch.
const subscribeToNothing = () => () => {};
const isMacSnapshot = () =>
  /mac/i.test(navigator.userAgentData?.platform || navigator.platform || "");

export function useModifierKeyLabel() {
  const isMac = React.useSyncExternalStore(
    subscribeToNothing,
    isMacSnapshot,
    () => false,
  );
  return isMac ? "⌘" : "Ctrl";
}

// Fires `onTrigger` on ⌘K / Ctrl+K (and ⌘/ ) unless the user is typing in a field.
export function useCommandShortcut(onTrigger, { enabled = true } = {}) {
  React.useEffect(() => {
    if (!enabled) return undefined;
    const handler = (event) => {
      const key = event.key?.toLowerCase();
      if ((key === "k" || key === "/") && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        onTrigger?.();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onTrigger, enabled]);
}

export default CommandPalette;
