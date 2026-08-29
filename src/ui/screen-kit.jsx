"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
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

function formatNumericParts({ decimals, hasComma }, current) {
  const fixed = Math.max(current, 0).toFixed(decimals);
  const [intPart, decPart = ""] = fixed.split(".");
  const formattedInt = hasComma ? Number(intPart).toLocaleString("en-US") : intPart;
  return { formattedInt, decPart };
}

// Splits a formatted number into stable, position-keyed slots so digits that
// already existed keep their identity (and just roll) while a digit that's
// newly appeared — e.g. going 9 -> 10 — mounts fresh and grows in.
function toSlots(prefix, intStr, decStr, suffix) {
  const slots = [];
  prefix.split("").forEach((ch, i) => slots.push({ key: `pre-${i}`, ch }));

  const intChars = intStr.split("");
  const n = intChars.length;
  intChars.forEach((ch, i) => {
    slots.push({ key: `int-${n - 1 - i}`, ch });
  });

  if (decStr) {
    slots.push({ key: "dot", ch: "." });
    decStr.split("").forEach((ch, i) => slots.push({ key: `dec-${i}`, ch }));
  }

  suffix.split("").forEach((ch, i) => slots.push({ key: `suf-${i}`, ch }));
  return slots;
}

const ROLL_DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function RollingDigit({ digit }) {
  return (
    <span className="relative inline-block h-[1em] w-[1ch] overflow-hidden align-baseline">
      <span
        className="absolute inset-x-0 top-0 flex flex-col transition-transform duration-150 ease-out"
        style={{ transform: `translateY(-${digit * 10}%)` }}
      >
        {ROLL_DIGITS.map((n) => (
          <span key={n} className="flex h-[1em] items-center justify-center leading-none">
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

// A slot mounts at zero width/opacity and grows in — this is what makes a
// newly-appearing digit (or comma) visibly "grow" instead of just popping in.
function GrowSlot({ children }) {
  const [grown, setGrown] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setGrown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <span
      className="inline-block overflow-hidden align-baseline transition-[width,opacity] duration-300 ease-out"
      style={{ width: grown ? "1ch" : "0ch", opacity: grown ? 1 : 0 }}
    >
      {children}
    </span>
  );
}

// Animates a stat value counting up from 0 (or from its previous value, on
// later updates) to the target, with each digit rolling into place and newly
// appearing digits growing in — e.g. crossing 9 -> 10 grows a new column.
export function RollingNumber({ value, className, duration = 900 }) {
  const parsed = useMemo(() => parseNumericDisplay(value), [value]);
  const [display, setDisplay] = useState(0);
  const fromRef = useRef(0);

  useEffect(() => {
    if (!parsed) return undefined;
    const from = fromRef.current;
    const to = parsed.numeric;
    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = from + (to - from) * eased;
      setDisplay(current);
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [parsed?.numeric, duration]);

  if (!parsed) {
    return <span className={cn("inline-flex tabular-nums", className)}>{value}</span>;
  }

  const { formattedInt, decPart } = formatNumericParts(parsed, display);
  const slots = toSlots(parsed.prefix, formattedInt, decPart, parsed.suffix);

  return (
    <span className={cn("inline-flex tabular-nums", className)}>
      {slots.map(({ key, ch }) => (
        <GrowSlot key={key}>
          {/\d/.test(ch) ? <RollingDigit digit={Number(ch)} /> : ch}
        </GrowSlot>
      ))}
    </span>
  );
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
