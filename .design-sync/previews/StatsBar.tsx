import { StatsBar } from "@geiger/ui";

// Capture-only: report reduced motion so RollingNumber renders its settled value instead of a mid-roll frame.
if (typeof window !== "undefined" && window.matchMedia) {
  const realMatchMedia = window.matchMedia.bind(window);
  window.matchMedia = (q: string) =>
    q.includes("prefers-reduced-motion")
      ? ({ matches: true, media: q, onchange: null, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent: () => false } as any)
      : realMatchMedia(q);
}

export const FourColumns = () => (
  <div style={{ width: 820 }}>
    <StatsBar
      stats={[
        { label: "Total events", value: "24", delta: "+3", trend: "up", footer: "6 on sale now" },
        { label: "Tickets sold", value: "12,480", delta: "+8.2%", trend: "up", footer: "Across all events" },
        { label: "Revenue", value: "$384,920", delta: "+12.4%", trend: "up", footer: "Gross, before fees" },
        { label: "Avg. capacity", value: "71%", delta: "-2.1%", trend: "down", footer: "Sell-through" },
      ]}
    />
  </div>
);

export const ThreeColumns = () => (
  <div style={{ width: 820 }}>
    <StatsBar
      columns={3}
      stats={[
        { label: "Registrations", value: "1,204", delta: "+14%", trend: "up", footer: "Last 30 days" },
        { label: "Checked in", value: "862", delta: "+6%", trend: "up", footer: "72% of registrations" },
        { label: "Refunds", value: "18", delta: "-4%", trend: "down", footer: "$1,440 returned" },
      ]}
    />
  </div>
);

export const TwoColumnsNoDelta = () => (
  <div style={{ width: 560 }}>
    <StatsBar
      columns={2}
      stats={[
        { label: "Open orders", value: "37", footer: "Awaiting payment" },
        { label: "Payout balance", value: "$18,250", footer: "Next payout Oct 14" },
      ]}
    />
  </div>
);
