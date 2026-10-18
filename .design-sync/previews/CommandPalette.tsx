import * as React from "react";
import { CommandPalette } from "@geiger/ui";
import {
  LayoutDashboard,
  CalendarDays,
  LayoutTemplate,
  Repeat,
  Ticket,
  Users,
  QrCode,
  BarChart3,
  Megaphone,
  Settings,
  Plus,
  UserPlus,
} from "lucide-react";

const NAV = [
  { title: "Overview", icon: LayoutDashboard },
  {
    title: "Events",
    icon: CalendarDays,
    subItems: [
      { title: "All Events", icon: CalendarDays },
      { title: "Templates", icon: LayoutTemplate },
      { title: "Event Series", icon: Repeat },
    ],
  },
  {
    title: "Tickets",
    icon: Ticket,
    subItems: [
      { title: "Ticket Types", icon: Ticket },
      { title: "Early-bird Sales", icon: Ticket },
    ],
  },
  { title: "Guests", icon: Users },
  { title: "Check-in", icon: QrCode },
  { title: "Analytics", icon: BarChart3 },
  { title: "Campaigns", icon: Megaphone },
  { title: "Settings", icon: Settings },
];

const ACTIONS = [
  { title: "Create event", icon: Plus, group: "Actions" },
  { title: "Invite teammate", icon: UserPlus, group: "Actions" },
];

export const WorkspaceNavigation = () => (
  <CommandPalette open nav={NAV} placeholder="Search Events..." recentsKey="ds-preview:palette:none" />
);

export const WithRecents = () => {
  const key = "ds-preview:palette:recents";
  React.useState(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(["Events/All Events", "Check-in", "Tickets/Ticket Types"]));
    } catch {
      /* storage unavailable */
    }
    return null;
  });
  return <CommandPalette open nav={NAV} items={ACTIONS} placeholder="Search Events..." recentsKey={key} />;
};

// Types a query into the palette so the ranked, highlighted result list shows.
const Typed = ({ query, ...props }: { query: string } & React.ComponentProps<typeof CommandPalette>) => {
  React.useEffect(() => {
    const id = setTimeout(() => {
      const input = document.querySelector<HTMLInputElement>('[data-slot="command-palette"] input');
      if (!input) return;
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
      setter?.call(input, query);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }, 80);
    return () => clearTimeout(id);
  }, [query]);
  return <CommandPalette {...props} />;
};

export const SearchResults = () => (
  <Typed query="tick" open nav={NAV} items={ACTIONS} placeholder="Search Events..." recentsKey="ds-preview:palette:none" />
);

export const NoMatches = () => (
  <Typed query="payroll" open nav={NAV} placeholder="Search Events..." recentsKey="ds-preview:palette:none" />
);
