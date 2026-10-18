import { StatTile } from "@geiger/ui";
import { DollarSign, Ticket, Users } from "lucide-react";

// Capture-only: report reduced motion so RollingNumber renders its settled value instead of a mid-roll frame.
if (typeof window !== "undefined" && window.matchMedia) {
  const realMatchMedia = window.matchMedia.bind(window);
  window.matchMedia = (q: string) =>
    q.includes("prefers-reduced-motion")
      ? ({ matches: true, media: q, onchange: null, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent: () => false } as any)
      : realMatchMedia(q);
}

export const TrendUp = () => (
  <div style={{ width: 260 }}>
    <StatTile label="Revenue" value="$384,920" delta="+12.4%" trend="up" hint="Gross, before fees" icon={DollarSign} />
  </div>
);

export const TrendDown = () => (
  <div style={{ width: 260 }}>
    <StatTile label="Attendees" value="9,312" delta="-1.8%" trend="down" hint="Checked in on site" icon={Users} />
  </div>
);

export const Neutral = () => (
  <div style={{ width: 260 }}>
    <StatTile label="Tickets sold" value="12,480" delta="flat" hint="Across all events" icon={Ticket} />
  </div>
);
