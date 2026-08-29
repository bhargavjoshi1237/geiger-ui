"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Minus, Plus } from "lucide-react";

import { cn } from "../lib/utils";
import { Button } from "./button.jsx";
import { Card, CardContent } from "./card.jsx";
import { Badge } from "./badge.jsx";
import { Switch } from "./switch.jsx";
import { ExpandableSearch } from "./expandable-search.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table.jsx";

export function ScreenHeader({ title, description, actions, className }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between",
        className,
      )}
    >
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 max-w-2xl text-sm font-medium text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}

export function EditorSectionHeader({ title, description, action, className }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0">
        <h2 className="text-lg font-semibold capitalize text-white">{title}</h2>
        {description ? (
          <p className="mt-0.5 text-sm text-text-secondary">{description}</p>
        ) : null}
      </div>
      {action ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">{action}</div>
      ) : null}
    </div>
  );
}

export function StatGrid({ stats, columns = 4, className }) {
  const colClass =
    {
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-3",
      4: "grid-cols-2 lg:grid-cols-4",
      5: "grid-cols-2 lg:grid-cols-5",
    }[columns] || "grid-cols-2 lg:grid-cols-4";

  return (
    <div className={cn("grid gap-4", colClass, className)}>
      {stats.map((stat) => (
        <StatTile key={stat.label} {...stat} />
      ))}
    </div>
  );
}

export function StatTile({ label, value, delta, trend, hint, icon: Icon }) {
  const trendClass =
    trend === "up"
      ? "text-emerald-400"
      : trend === "down"
        ? "text-red-400"
        : "text-text-secondary";

  return (
    <Card className="rounded-xl border-border bg-surface-subtle py-0 text-foreground capitalize">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium uppercase tracking-wider text-text-secondary">
            {label}
          </span>
          {Icon ? <Icon className="h-4 w-4 text-text-tertiary" /> : null}
        </div>
        <div className="mt-2 flex flex-col items-start gap-1 sm:flex-row sm:items-end sm:gap-2">
          <RollingNumber
            value={value}
            className="text-2xl font-bold leading-none text-white tabular-nums"
          />
          {delta ? (
            <span className={cn("text-xs font-medium sm:mb-0.5", trendClass)}>
              {delta}
            </span>
          ) : null}
        </div>
        {hint ? (
          <span className="mt-1.5 block text-[11px] text-text-tertiary">{hint}</span>
        ) : null}
      </CardContent>
    </Card>
  );
}

// Parses a formatted stat string ("$12,345", "84%", "1,204+") into the parts
// needed to animate it: a numeric core plus the literal prefix/suffix around it.
function parseNumericDisplay(value) {
  const str = String(value ?? "");
  const match = str.match(/^([^\d]*)([\d,]*\.?\d*)([^\d]*)$/);
  if (!match || match[2] === "") return null;
  const [, prefix, numPart, suffix] = match;
  const hasComma = numPart.includes(",");
  const decimalMatch = numPart.match(/\.(\d+)$/);
  const decimals = decimalMatch ? decimalMatch[1].length : 0;
  const numeric = parseFloat(numPart.replace(/,/g, "")) || 0;
  return { prefix, suffix, numeric, decimals, hasComma };
}

// The strip repeats 0 at the end so a wheel can roll past 9 into the next 0
// without snapping backwards.
const ROLL_STRIP = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
// Share of the run spent revealing new columns, one place at a time.
const APPEAR_WINDOW = 0.55;
const FADE_MS = 320;
const WIDTH_MS = 180;
// Extra full turns granted to the ones column, decaying towards the left.
const MAX_EXTRA_TURNS = 3;

const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
const easeOut = (p) => 1 - Math.pow(1 - p, 3);

// Plans one wheel per digit place. Each wheel spins forward a bounded number of
// turns onto its final digit rather than tracking the true running total: for a
// value like 371,940 the low places would otherwise change thousands of times
// per frame, which reads as noise instead of rolling.
function buildPlan(from, to, parsed, duration) {
  const { decimals } = parsed;
  const scale = 10 ** decimals;
  const toScaled = Math.round(Math.max(to, 0) * scale);
  const fromScaled = Math.round(Math.max(from, 0) * scale);
  const digits = String(toScaled).padStart(decimals + 1, "0");
  const count = digits.length;
  // Nothing to roll towards — a placeholder zero while a screen is still
  // fetching, or a refetch that came back unchanged. The wheels must sit still.
  const still = fromScaled === toScaled;

  // Places the number hasn't grown into yet are revealed lowest-first — the
  // 9 -> 10 moment, where a new wheel fades in beside the existing ones.
  const appearing = [];
  for (let place = decimals + 1; place < count; place += 1) {
    if (!still && fromScaled < 10 ** place) appearing.push(place);
  }
  const revealSpan = duration * APPEAR_WINDOW;

  const columns = [];
  for (let place = 0; place < count; place += 1) {
    const end = Number(digits[count - 1 - place]);
    const start = still ? end : Math.floor(fromScaled / 10 ** place) % 10;
    const rank = appearing.indexOf(place);
    const isNew = rank !== -1;
    const turns = Math.max(isNew ? 1 : 0, MAX_EXTRA_TURNS - place);
    columns.push({
      start,
      isNew,
      appearAt: isNew ? (revealSpan * (rank + 1)) / (appearing.length + 1) : 0,
      travel: still ? 0 : ((end - start + 10) % 10) + turns * 10,
    });
  }

  return { to, duration, decimals, still, columns };
}

// Resolves a column's wheel offset (in digit rows) plus its reveal progress at
// the given point in the run.
function columnState(column, elapsed, duration) {
  const span = Math.max(duration - column.appearAt, 1);
  const rolled = easeOut(clamp01((elapsed - column.appearAt) / span));
  const since = elapsed - column.appearAt;
  return {
    offset: (column.start + column.travel * rolled) % 10,
    opacity: column.isNew ? clamp01(since / FADE_MS) : 1,
    width: column.isNew ? easeOut(clamp01(since / WIDTH_MS)) : 1,
  };
}

function RollingWheel({ offset, opacity, width }) {
  return (
    <span
      className="relative inline-block h-[1em] overflow-hidden align-baseline"
      style={{ width: `${width}ch`, opacity }}
    >
      <span
        className="absolute left-0 top-0 flex w-[1ch] flex-col"
        style={{ transform: `translateY(-${offset}em)` }}
      >
        {ROLL_STRIP.map((n, i) => (
          <span
            key={i}
            className="flex h-[1em] items-center justify-center leading-none"
          >
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

// Animates a stat value up from 0 (or from its previous value, on later
// updates): the ones wheel rolls first and every time the number grows past
// another power of ten a fresh wheel fades in on the left, until all of them
// settle on the target. A screen that renders its tiles before the fetch
// resolves parks on a still 0 and only rolls once a real value lands.
export function RollingNumber({ value, className, duration = 1100 }) {
  const parsed = useMemo(() => parseNumericDisplay(value), [value]);
  const target = parsed ? parsed.numeric : 0;
  const [plan, setPlan] = useState(() =>
    parsed ? buildPlan(0, target, parsed, duration) : null,
  );
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!parsed) return;
    setPlan((prev) =>
      prev && prev.to === target
        ? prev
        : buildPlan(prev ? prev.to : 0, target, parsed, duration),
    );
  }, [parsed, target, duration]);

  useEffect(() => {
    if (!plan || plan.still) return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setElapsed(plan.duration);
      return undefined;
    }
    const started = performance.now();
    setElapsed(0);
    let frame = requestAnimationFrame(function tick(now) {
      const e = now - started;
      setElapsed(Math.min(e, plan.duration));
      if (e < plan.duration) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [plan]);

  // No number yet: an absent value parks on a still 0 so the tile reads as
  // "nothing fetched" rather than empty, while a genuinely non-numeric label
  // ("N/A", "—") is passed through untouched.
  if (!parsed) {
    const pending = value === null || value === undefined || value === "";
    return (
      <span className={cn("inline-flex tabular-nums", className)}>
        {pending ? <RollingWheel offset={0} opacity={1} width={1} /> : value}
      </span>
    );
  }

  // A value just arrived but its plan lands on the next commit — hold at 0 for
  // this frame so the final number never flashes in ahead of the roll.
  if (!plan) {
    return (
      <span className={cn("inline-flex tabular-nums", className)}>
        <RollingWheel offset={0} opacity={1} width={1} />
      </span>
    );
  }

  const { columns, decimals } = plan;
  const nodes = [];

  parsed.prefix.split("").forEach((ch, i) => {
    nodes.push(<span key={`pre-${i}`}>{ch}</span>);
  });

  for (let place = columns.length - 1; place >= decimals; place -= 1) {
    const column = columns[place];
    if (elapsed < column.appearAt) continue;
    const state = columnState(column, elapsed, plan.duration);
    nodes.push(<RollingWheel key={`int-${place}`} {...state} />);
    const intPlace = place - decimals;
    if (parsed.hasComma && intPlace > 0 && intPlace % 3 === 0) {
      nodes.push(
        <span key={`sep-${intPlace}`} style={{ opacity: state.opacity }}>
          ,
        </span>,
      );
    }
  }

  if (decimals > 0) {
    nodes.push(<span key="dot">.</span>);
    for (let place = decimals - 1; place >= 0; place -= 1) {
      nodes.push(
        <RollingWheel
          key={`dec-${place}`}
          {...columnState(columns[place], elapsed, plan.duration)}
        />,
      );
    }
  }

  parsed.suffix.split("").forEach((ch, i) => {
    nodes.push(<span key={`suf-${i}`}>{ch}</span>);
  });

  return <span className={cn("inline-flex tabular-nums", className)}>{nodes}</span>;
}

const STATS_BAR_COLS = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
};

export function StatsBar({ stats, columns = 4, className }) {
  const colCount = [2, 3, 4].includes(columns) ? columns : 4;
  const cols = STATS_BAR_COLS[colCount];

  return (
    <Card
      className={cn(
        "gap-0 overflow-hidden rounded-xl border-border bg-surface-subtle py-0 text-foreground",
        className,
      )}
    >
      <CardContent className="p-0">
        <div className={cn("grid", cols)}>
          {stats.map((stat, i) => {
            const up = stat.trend === "up";
            const TrendIcon = up ? ArrowUpRight : ArrowDownRight;
            return (
              <div
                key={stat.label}
                className={cn(
                  "p-4 border-border",
                  i % 2 !== 0 && "border-l",
                  i >= 2 && "border-t",
                  "md:border-l-0 md:border-t-0",
                  i % colCount !== 0 && "md:border-l",
                  i >= colCount && "md:border-t",
                )}
              >
                <span className="text-[11px] font-medium uppercase tracking-wider text-text-secondary">
                  {stat.label}
                </span>
                <div className="mt-1 flex flex-col items-start gap-1 sm:flex-row sm:items-end sm:gap-2">
                  <RollingNumber
                    value={stat.value}
                    className="text-2xl font-bold leading-none text-white"
                  />
                  {stat.delta ? (
                    <span
                      className={cn(
                        "inline-flex items-center gap-0.5 text-xs font-medium sm:mb-0.5",
                        up ? "text-emerald-400" : "text-red-400",
                      )}
                    >
                      <TrendIcon className="h-3 w-3" />
                      {stat.delta}
                    </span>
                  ) : null}
                </div>
                {stat.footer ? (
                  <span className="mt-1 block text-[11px] text-text-tertiary capitalize">
                    {stat.footer}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export function SectionCard({
  title,
  description,
  action,
  children,
  className,
  contentClassName,
  bodyPadding = true,
  bare = false,
}) {
  if (bare) {
    return (
      <section className={cn("text-foreground", className)}>
        {title || action ? (
          <div className="flex items-start justify-between gap-3 border-b border-border pb-3">
            <div className="min-w-0">
              {title ? (
                <h3 className="text-base font-semibold capitalize text-foreground">
                  {title}
                </h3>
              ) : null}
              {description ? (
                <p className="mt-0.5 text-sm text-text-secondary">{description}</p>
              ) : null}
            </div>
            {action ? <div className="shrink-0">{action}</div> : null}
          </div>
        ) : null}
        <div className={cn(bodyPadding ? "pt-4" : "", contentClassName)}>
          {children}
        </div>
      </section>
    );
  }
  return (
    <Card
      className={cn(
        "gap-0 overflow-hidden rounded-xl border-border bg-surface-subtle py-0 text-foreground",
        className,
      )}
    >
      {title || action ? (
        <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
          <div className="min-w-0">
            {title ? (
              <h3 className="text-base font-semibold capitalize text-foreground">{title}</h3>
            ) : null}
            {description ? (
              <p className="mt-0.5 text-sm text-text-secondary">{description}</p>
            ) : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      ) : null}
      <CardContent className={cn(bodyPadding ? "p-5" : "p-0", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search…",
  expanded = false,
  className,
  "aria-label": ariaLabel,
}) {
  return (
    <ExpandableSearch
      value={value ?? ""}
      onChange={onChange}
      placeholder={placeholder}
      label={ariaLabel || placeholder}
      open={expanded ? true : undefined}
      autoFocus={!expanded}
      expandedWidth={expanded ? "100%" : "16rem"}
      className={cn(expanded ? "w-full" : "ml-auto", className)}
      inputClassName="[&::-webkit-search-cancel-button]:appearance-none"
    />
  );
}

export function Toolbar({ children, className }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function StatusPill({ status, map, className }) {
  const meta = map?.[status];
  return (
    <Badge variant={meta?.variant || "neutral"} className={className}>
      {meta?.dot !== false ? (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            meta?.dotClass || "bg-current",
          )}
        />
      ) : null}
      {meta?.label || status}
    </Badge>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col h-full items-center justify-center gap-3 px-6 py-16 text-center",
        className,
      )}
    >
      {Icon ? (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-card text-text-secondary">
          <Icon className="h-6 w-6" />
        </div>
      ) : null}
      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground capitalize">{title}</p>
        {description ? (
          <p className="mx-auto max-w-sm text-sm text-text-secondary capitalize">{description}</p>
        ) : null}
      </div>
      {action ? <div className="mt-1">{action}</div> : null}
    </div>
  );
}

const ALIGN_CLASS = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function DataTable({
  columns,
  data,
  getRowKey,
  onRowClick,
  empty,
  className,
}) {
  if (!data?.length && empty) {
    return <div className={className}>{empty}</div>;
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-surface-subtle",
        className,
      )}
    >
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className={cn("px-4", ALIGN_CLASS[col.align], col.headClassName)}
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, i) => (
            <TableRow
              key={getRowKey ? getRowKey(row, i) : i}
              className={cn(
                "border-border",
                onRowClick && "cursor-pointer",
              )}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  className={cn("px-4 py-4", ALIGN_CLASS[col.align], col.className)}
                >
                  {col.render ? col.render(row) : row[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function SettingsList({ children, className }) {
  return (
    <div className={cn("divide-y divide-border", className)}>{children}</div>
  );
}

export function SettingRow({
  title,
  description,
  icon: Icon,
  control,
  checked,
  onCheckedChange,
  className,
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0",
        className,
      )}
    >
      <div className="flex min-w-0 items-start gap-3">
        {Icon ? (
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-card text-muted-foreground">
            <Icon className="h-4 w-4" />
          </div>
        ) : null}
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">{title}</p>
          {description ? (
            <p className="text-xs text-text-secondary">{description}</p>
          ) : null}
        </div>
      </div>
      <div className="shrink-0">
        {control !== undefined ? (
          control
        ) : (
          <Switch checked={checked} onCheckedChange={onCheckedChange} />
        )}
      </div>
    </div>
  );
}

const STEPPER_BUTTON =
  "border-border-strong bg-surface-card text-foreground hover:bg-surface-active";

export function Field({
  label,
  hint,
  htmlFor,
  children,
  className,
  stepper = false,
  value,
  onValueChange,
  step = 1,
  min,
  max,
}) {
  const current = Number(value) || 0;
  const atMin = min !== undefined && current <= Number(min);
  const atMax = max !== undefined && current >= Number(max);

  const shift = (dir) => {
    let next = current + dir * (Number(step) || 1);
    if (min !== undefined) next = Math.max(Number(min), next);
    if (max !== undefined) next = Math.min(Number(max), next);
    next = Math.round(next * 1e6) / 1e6;
    onValueChange?.(String(next));
  };

  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      {label ? (
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-muted-foreground"
        >
          {label}
        </label>
      ) : null}
      {stepper ? (
        <div className="flex items-center gap-1.5">
          <div className="min-w-0 flex-1">{children}</div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className={STEPPER_BUTTON}
            aria-label={`Decrease ${label || "value"}`}
            disabled={atMin}
            onClick={() => shift(-1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className={STEPPER_BUTTON}
            aria-label={`Increase ${label || "value"}`}
            disabled={atMax}
            onClick={() => shift(1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        children
      )}
      {hint ? <p className="text-xs text-text-secondary">{hint}</p> : null}
    </div>
  );
}

export function InlineTitleInput({
  value,
  onChange,
  className,
  placeholder = "Untitled",
  ...props
}) {
  return (
    <span className="inline-grid max-w-full">
      <span
        aria-hidden="true"
        className={cn(
          "invisible col-start-1 row-start-1 overflow-hidden whitespace-pre pr-[2px]",
          className,
        )}
      >
        {value || placeholder}
      </span>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        spellCheck={false}
        className={cn(
          "col-start-1 row-start-1 w-full min-w-0 rounded-sm bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
          className,
        )}
        {...props}
      />
    </span>
  );
}
