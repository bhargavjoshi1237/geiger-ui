import * as React from "react";
import { NavVisibilitySettings, defineNavConfig } from "@geiger/ui";
import { LayoutDashboard, CalendarDays, MapPin, Ticket, QrCode } from "lucide-react";

const NAV = [
  { title: "Overview", icon: LayoutDashboard },
  {
    title: "Events",
    icon: CalendarDays,
    subItems: [{ title: "All Events" }, { title: "Templates" }, { title: "Event Series" }],
  },
  {
    title: "Venues",
    icon: MapPin,
    subItems: [{ title: "Floor Plans" }, { title: "Seating Charts" }, { title: "Venue Sourcing" }],
  },
  {
    title: "Tickets",
    icon: Ticket,
    subItems: [{ title: "Ticket Types" }, { title: "Early-bird Sales" }, { title: "Payouts" }],
  },
  {
    title: "Check-in",
    icon: QrCode,
    subItems: [{ title: "Check-in App" }, { title: "Kiosk Mode" }, { title: "Self Check-in" }],
  },
];

const CONFIG = defineNavConfig({
  product: "events",
  locked: ["Overview", "Events", "All Events"],
  dependencies: [
    { screen: "Floor Plans", requires: ["Venues"], reason: "Floor plans are drawn to scale against a venue." },
    { screen: "Seating Charts", requires: ["Floor Plans"] },
    { screen: "Check-in", requires: ["Tickets"], reason: "Check-in scans the tickets people bought." },
    { screen: "Kiosk Mode", requires: ["Check-in App"] },
    { screen: "Self Check-in", requires: ["Check-in App"] },
  ],
});

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: "100%", maxWidth: 760, padding: 4 }}>{children}</div>
);

export const AllSections = () => (
  <Frame>
    <NavVisibilitySettings nav={NAV} config={CONFIG} hidden={[]} />
  </Frame>
);

export const WithHiddenScreens = () => (
  <Frame>
    <NavVisibilitySettings
      nav={NAV}
      config={CONFIG}
      hidden={["Venue Sourcing", "Kiosk Mode", "Payouts"]}
      onReset={() => {}}
    />
  </Frame>
);

// Expands the Venues card so the per-screen switches and dependency chips show.
export const ExpandedSection = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const id = setTimeout(() => {
      const toggles = ref.current?.querySelectorAll<HTMLButtonElement>("button[aria-expanded]");
      toggles?.[1]?.click();
    }, 50);
    return () => clearTimeout(id);
  }, []);
  return (
    <div ref={ref} style={{ width: "100%", maxWidth: 760, padding: 4 }}>
      <NavVisibilitySettings
        nav={NAV.filter((s) => s.title === "Overview" || s.title === "Venues" || s.title === "Tickets")}
        config={CONFIG}
        hidden={["Venue Sourcing"]}
        onReset={() => {}}
      />
    </div>
  );
};
