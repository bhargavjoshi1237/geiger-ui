"use client";

import * as React from "react";
import { cn } from "../lib/utils.js";

// LogoLoading — animated treatments of the Geiger mark, for loading states
// that deserve more presence than a spinner (full-page/section loaders, empty
// states mid-fetch). Not for buttons or small inline spots — keep the Lucide
// spinner there. Keyframes + per-variant timing live in tokens.css.

const VIEW_BOX = "0 0 467 285";

const BAR_D = [
  "M218.309 1.31216L224 1.15608L193.641 50.3271L170.178 91.0997L136.561 149.51L124.008 172.428L103.37 206.726L77.2097 251.035L57.3197 283.677L6.18221 283.433L0 284.156L22.4687 244.331L54.6016 189.816L75.3213 152.467L94.3273 119.376L144.096 31L161 1.15608L218.309 1.31216Z",
  "M344.758 0L345.096 0.735049C326.643 33.9528 307.753 66.9251 288.428 99.6433C284.236 106.683 278.484 114.061 274.613 121.064C265.581 137.399 256.332 153.496 247.097 169.697L208.592 236.882C199.377 253.009 192.444 267.92 180.666 282.525C163.285 284.093 142.445 282.6 123.432 284L123.098 283.728C123.005 282.163 127.788 276.233 129.062 273.917C135.826 261.605 142.61 249.297 149.637 237.134L240.526 79.7429C249.025 64.9272 257.723 50.1984 266.187 35.3414C268.992 30.4177 277.596 15 285.096 0.735052C305.596 0.735046 325.596 0.735049 344.131 0.1168L344.758 0Z",
  "M427.054 1.17427C431.046 1.15338 464.984 0.670938 466.079 1.40804C466.298 4.01125 464.421 3.92073 463.267 6.18971C450.436 31.3381 435.978 55.3181 422.003 79.8289L339.669 223C327.843 243.287 317.065 263.871 304.413 283.952L285.161 283.494C273.521 283.311 254.97 282.561 244.096 284C255.18 269.451 265.622 246.845 275.646 231.004C280.056 224.033 284.971 216.613 289.146 209.596C302.879 186.047 316.389 162.368 329.675 138.564C346.203 109.513 363.065 80.653 380.256 51.9898C390.11 35.4483 398.71 17.3651 409.366 1.55774C415.08 1.29513 421.301 1.29165 427.054 1.17427Z",
];

// Weight is relative, not a percentage — "priority" variants (Arc flicker,
// Sequential strobe, Neon start, Relay pulse) sit slightly above the rest.
export const LOGO_LOADING_VARIANTS = [
  { id: "neon-start", label: "Neon start", weight: 2 },
  { id: "burst", label: "Burst", weight: 1 },
  { id: "countdown", label: "Countdown", weight: 1 },
  { id: "dying-bulb", label: "Dying bulb", weight: 1 },
  { id: "fuse-relay", label: "Fuse relay", weight: 1 },
  { id: "arc-flicker", label: "Arc flicker", weight: 2 },
  { id: "ghost-trace", label: "Ghost trace", weight: 1 },
  { id: "sequential-strobe", label: "Sequential strobe", weight: 2 },
  { id: "baton-sweep", label: "Baton sweep", weight: 1 },
  { id: "trace-ink", label: "Trace & ink", weight: 1 },
  { id: "axis-slide", label: "Axis slide", weight: 1 },
  { id: "elastic-pop", label: "Elastic pop", weight: 1 },
  { id: "relay-pulse", label: "Relay pulse", weight: 2 },
  { id: "signal-glitch", label: "Signal glitch", weight: 1 },
  { id: "static-crackle", label: "Static crackle", weight: 1 },
  { id: "warning-flash", label: "Warning flash", weight: 1 },
  { id: "short-circuit", label: "Short circuit", weight: 1 },
  { id: "heartbeat-pulse", label: "Heartbeat pulse", weight: 1 },
  { id: "counter-ticks", label: "Counter ticks", weight: 1 },
];

const VARIANT_IDS = LOGO_LOADING_VARIANTS.map((v) => v.id);

// Drawn on the server and on the first client paint, before the random roll lands.
const DEFAULT_VARIANT = LOGO_LOADING_VARIANTS[0].id;

function normalizeVariantId(name) {
  if (!name) return null;
  const slug = String(name)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return VARIANT_IDS.includes(slug) ? slug : null;
}

function pickWeightedVariant() {
  const total = LOGO_LOADING_VARIANTS.reduce((sum, v) => sum + v.weight, 0);
  let roll = Math.random() * total;
  for (const variant of LOGO_LOADING_VARIANTS) {
    roll -= variant.weight;
    if (roll <= 0) return variant.id;
  }
  return LOGO_LOADING_VARIANTS[0].id;
}

function GeigerBars() {
  // pathLength="100" normalizes each bar to 100 units regardless of its actual
  // geometry, so stroke-dasharray/dashoffset:100 traces the whole outline in
  // one smooth sweep instead of a dashed, broken line.
  return BAR_D.map((d, i) => <path key={i} className="gl-bar" d={d} pathLength="100" />);
}

function BatonSweepMark({ size, height }) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const gradId = `gl-band-${uid}`;
  const maskId = `gl-mask-${uid}`;
  return (
    <svg viewBox={VIEW_BOX} width={size} height={height} stroke="none" aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000000" />
          <stop offset="0.5" stopColor="#ffffff" />
          <stop offset="1" stopColor="#000000" />
        </linearGradient>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="-400" y="-200" width="1300" height="800">
          <rect x="0" y="-160" width="190" height="620" fill={`url(#${gradId})`} className="gl-sweep-rect" />
        </mask>
      </defs>
      <g style={{ fill: "#4a4a4a" }}>
        {BAR_D.map((d, i) => <path key={i} d={d} />)}
      </g>
      <g style={{ fill: "var(--gl-accent, #e7e7e7)" }} mask={`url(#${maskId})`}>
        {BAR_D.map((d, i) => <path key={i} d={d} />)}
      </g>
    </svg>
  );
}

function SignalGlitchMark({ size, height }) {
  return (
    <div className="gl-glitch-frame" style={{ width: size, height }}>
      <svg viewBox={VIEW_BOX} width={size} height={height} className="gl-fringe" style={{ color: "#ff4d4d" }} fill="currentColor" stroke="none" aria-hidden="true">
        {BAR_D.map((d, i) => <path key={i} d={d} />)}
      </svg>
      <svg viewBox={VIEW_BOX} width={size} height={height} className="gl-fringe gl-fringe-b" style={{ color: "var(--gl-accent, #e7e7e7)" }} fill="currentColor" stroke="none" aria-hidden="true">
        {BAR_D.map((d, i) => <path key={i} d={d} />)}
      </svg>
      <svg viewBox={VIEW_BOX} width={size} height={height} className="gl-glitch-top" fill="currentColor" stroke="none" aria-hidden="true">
        {BAR_D.map((d, i) => <path key={i} d={d} />)}
      </svg>
    </div>
  );
}

function LogoLoadingMark({ variant, size }) {
  const height = Math.round((size * 285) / 467);
  if (variant === "baton-sweep") return <BatonSweepMark size={size} height={height} />;
  if (variant === "signal-glitch") return <SignalGlitchMark size={size} height={height} />;
  if (variant === "burst") {
    return (
      <svg viewBox={VIEW_BOX} width={size} height={height} fill="currentColor" stroke="none" aria-hidden="true">
        <g className="gl-mark">
          <GeigerBars />
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox={VIEW_BOX} width={size} height={height} fill="currentColor" stroke="none" aria-hidden="true">
      <GeigerBars />
    </svg>
  );
}

function LogoLoadingBase({
  variant,
  size = 64,
  accent,
  speed = 1,
  className,
  style,
  "aria-label": ariaLabel = "Loading",
  ...props
}) {
  const cssVars = {
    ...(accent ? { "--gl-accent": accent } : null),
    ...(speed !== 1 ? { "--gl-speed": speed } : null),
    ...style,
  };
  return (
    <span
      data-slot="logo-loading"
      data-variant={variant}
      role="status"
      aria-label={ariaLabel}
      className={cn("geiger-loading", className)}
      style={cssVars}
      {...props}
    >
      <LogoLoadingMark variant={variant} size={size} />
    </span>
  );
}

function makeVariantComponent(variantId, displayName) {
  function VariantComponent(props) {
    return <LogoLoadingBase variant={variantId} {...props} />;
  }
  VariantComponent.displayName = displayName;
  return VariantComponent;
}

export const NeonStartLoading = makeVariantComponent("neon-start", "NeonStartLoading");
export const BurstLoading = makeVariantComponent("burst", "BurstLoading");
export const CountdownLoading = makeVariantComponent("countdown", "CountdownLoading");
export const DyingBulbLoading = makeVariantComponent("dying-bulb", "DyingBulbLoading");
export const FuseRelayLoading = makeVariantComponent("fuse-relay", "FuseRelayLoading");
export const ArcFlickerLoading = makeVariantComponent("arc-flicker", "ArcFlickerLoading");
export const GhostTraceLoading = makeVariantComponent("ghost-trace", "GhostTraceLoading");
export const SequentialStrobeLoading = makeVariantComponent("sequential-strobe", "SequentialStrobeLoading");
export const BatonSweepLoading = makeVariantComponent("baton-sweep", "BatonSweepLoading");
export const TraceInkLoading = makeVariantComponent("trace-ink", "TraceInkLoading");
export const AxisSlideLoading = makeVariantComponent("axis-slide", "AxisSlideLoading");
export const ElasticPopLoading = makeVariantComponent("elastic-pop", "ElasticPopLoading");
export const RelayPulseLoading = makeVariantComponent("relay-pulse", "RelayPulseLoading");
export const SignalGlitchLoading = makeVariantComponent("signal-glitch", "SignalGlitchLoading");
export const StaticCrackleLoading = makeVariantComponent("static-crackle", "StaticCrackleLoading");
export const WarningFlashLoading = makeVariantComponent("warning-flash", "WarningFlashLoading");
export const ShortCircuitLoading = makeVariantComponent("short-circuit", "ShortCircuitLoading");
export const HeartbeatPulseLoading = makeVariantComponent("heartbeat-pulse", "HeartbeatPulseLoading");
export const CounterTicksLoading = makeVariantComponent("counter-ticks", "CounterTicksLoading");

// Umbrella component — pass `name` (id or label, e.g. "Neon start") to pin a
// treatment, or omit it to get a weighted-random pick made once per mount.
export function LogoLoading({ name, ...props }) {
  const requested = normalizeVariantId(name);
  // Rolled after mount, never during render: SSR and hydration would otherwise
  // draw different variants, and variant decides DOM shape (baton-sweep and
  // signal-glitch build their own subtrees), so the mismatch is structural.
  const [picked, setPicked] = React.useState(null);
  React.useEffect(() => {
    if (!requested) setPicked(pickWeightedVariant());
  }, [requested]);
  const variant = requested ?? picked ?? DEFAULT_VARIANT;
  return <LogoLoadingBase variant={variant} {...props} />;
}
