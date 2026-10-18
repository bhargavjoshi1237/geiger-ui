import { StatGrid } from "@geiger/ui";
import { CalendarDays, DollarSign, Ticket, Users } from "lucide-react";

// Capture-only: report reduced motion so RollingNumber renders its settled value instead of a mid-roll frame.
if (typeof window !== "undefined" && window.matchMedia) {
  const realMatchMedia = window.matchMedia.bind(window);
  window.matchMedia = (q: string) =>
    q.includes("prefers-reduced-motion")
      ? ({ matches: true, media: q, onchange: null, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent: () => false } as any)
      : realMatchMedia(q);
}

export const FourTiles = () => (
  <div style={{ width: 860 }}>
    <StatGrid
      stats={[
        { label: "Total events", value: "24", delta: "+3", trend: "up", hint: "6 on sale now", icon: CalendarDays },
        { label: "Tickets sold", value: "12,480", delta: "+8.2%", trend: "up", hint: "Across all events", icon: Ticket },
        { label: "Revenue", value: "$384,920", delta: "+12.4%", trend: "up", hint: "Gross, before fees", icon: DollarSign },
        { label: "Attendees", value: "9,312", delta: "-1.8%", trend: "down", hint: "Checked in on site", icon: Users },
      ]}
    />
  </div>
);

export const ThreeTiles = () => (
  <div style={{ width: 760 }}>
    <StatGrid
      columns={3}
      stats={[
        { label: "Active members", value: "1,486", delta: "+42", trend: "up", hint: "Renewing this month" },
        { label: "Churned", value: "23", delta: "+5", trend: "down", hint: "Last 30 days" },
        { label: "MRR", value: "$21,730", hint: "Billed monthly" },
      ]}
    />
  </div>
);
