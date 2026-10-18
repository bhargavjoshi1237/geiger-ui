import { RollingNumber } from "@geiger/ui";

// Capture-only: report reduced motion so RollingNumber renders its settled value instead of a mid-roll frame.
if (typeof window !== "undefined" && window.matchMedia) {
  const realMatchMedia = window.matchMedia.bind(window);
  window.matchMedia = (q: string) =>
    q.includes("prefers-reduced-motion")
      ? ({ matches: true, media: q, onchange: null, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent: () => false } as any)
      : realMatchMedia(q);
}

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>
      {label}
    </span>
    <RollingNumber value={value} className="text-2xl font-bold leading-none text-foreground" />
  </div>
);

export const Currency = () => <Stat label="Revenue" value="$384,920" />;

export const Percentage = () => <Stat label="Sell-through" value="71%" />;

export const Decimal = () => <Stat label="Avg. rating" value="4.8" />;

export const Row = () => (
  <div style={{ display: "flex", gap: 40 }}>
    <Stat label="Tickets sold" value="12,480" />
    <Stat label="Attendees" value="1,204+" />
    <Stat label="Refund rate" value="1.4%" />
  </div>
);
