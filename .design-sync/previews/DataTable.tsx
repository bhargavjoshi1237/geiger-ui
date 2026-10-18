import { Badge, Button, DataTable, EmptyState, Progress, StatusPill } from "@geiger/ui";
import { CalendarPlus, MoreHorizontal, Plus } from "lucide-react";

const EVENT_STATUS_MAP = {
  "On Sale": { label: "On Sale", variant: "success" },
  "Sold out": { label: "Sold out", variant: "info" },
  Draft: { label: "Draft", variant: "neutral" },
  Scheduled: { label: "Scheduled", variant: "purple" },
  Ended: { label: "Ended", variant: "outline" },
};

const EVENT_TYPE_MAP: Record<string, any> = { "In-person": "neutral", Online: "info", Hybrid: "purple" };

const EVENTS = [
  { id: "ev-1", name: "Design Systems Summit 2026", date: "Nov 12", venue: "Moscone West, San Francisco", status: "On Sale", type: "In-person", sold: 412, capacity: 500, revenue: 61388 },
  { id: "ev-2", name: "Product Week Berlin", date: "Dec 3", venue: "Kraftwerk, Berlin", status: "Sold out", type: "Hybrid", sold: 800, capacity: 800, revenue: 119200 },
  { id: "ev-3", name: "Remote Leadership Live", date: "Jan 21", venue: "Online", status: "Scheduled", type: "Online", sold: 96, capacity: 1000, revenue: 4704 },
  { id: "ev-4", name: "Founders Breakfast", date: "Feb 6", venue: "The Hoxton, London", status: "Draft", type: "In-person", sold: 0, capacity: 60, revenue: 0 },
];

type Ev = (typeof EVENTS)[number];

const columns = [
  {
    key: "name",
    header: "Event",
    render: (e: Ev) => (
      <div className="flex flex-col gap-1">
        <span className="font-medium text-foreground">{e.name}</span>
        <span className="text-xs text-text-secondary">{e.date} · {e.venue}</span>
      </div>
    ),
  },
  { key: "status", header: "Status", render: (e: Ev) => <StatusPill status={e.status} map={EVENT_STATUS_MAP} /> },
  { key: "type", header: "Format", render: (e: Ev) => <Badge variant={EVENT_TYPE_MAP[e.type]}>{e.type}</Badge> },
  {
    key: "sellthrough",
    header: "Sell-through",
    render: (e: Ev) => {
      const pct = Math.round((e.sold / e.capacity) * 100);
      return (
        <div style={{ width: 130, display: "flex", flexDirection: "column", gap: 6 }}>
          <Progress value={pct} />
          <span className="text-xs text-text-secondary">
            {e.sold.toLocaleString("en-US")} / {e.capacity.toLocaleString("en-US")} · {pct}%
          </span>
        </div>
      );
    },
  },
  {
    key: "revenue",
    header: "Revenue",
    align: "right",
    className: "text-right font-semibold tabular-nums",
    render: (e: Ev) => `$${e.revenue.toLocaleString("en-US")}`,
  },
  {
    key: "actions",
    header: "",
    align: "right",
    render: (e: Ev) => (
      <Button variant="ghost" size="icon" aria-label={`Actions for ${e.name}`}>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    ),
  },
];

export const EventsList = () => (
  <div style={{ width: 860 }}>
    <DataTable columns={columns} data={EVENTS} getRowKey={(e: Ev) => e.id} onRowClick={() => {}} />
  </div>
);

const MEMBER_ROLE = {
  Owner: { label: "Owner", variant: "purple" },
  Admin: { label: "Admin", variant: "info" },
  Member: { label: "Member", variant: "neutral" },
};

export const SimpleColumns = () => (
  <div style={{ width: 720 }}>
    <DataTable
      columns={[
        { key: "name", header: "Member", className: "font-medium" },
        { key: "email", header: "Email", className: "text-text-secondary" },
        { key: "role", header: "Role", render: (m: any) => <StatusPill status={m.role} map={MEMBER_ROLE} /> },
        { key: "joined", header: "Joined", align: "right" },
      ]}
      data={[
        { id: "u1", name: "Maya Patel", email: "maya@acme.io", role: "Owner", joined: "Mar 2024" },
        { id: "u2", name: "Liam Chen", email: "liam@acme.io", role: "Admin", joined: "Jul 2025" },
        { id: "u3", name: "Sofia Reyes", email: "sofia@acme.io", role: "Member", joined: "Sep 2026" },
      ]}
      getRowKey={(m: any) => m.id}
    />
  </div>
);

export const Empty = () => (
  <div style={{ width: 820 }}>
    <DataTable
      columns={columns}
      data={[]}
      empty={
        <div className="rounded-xl border border-border bg-surface-subtle">
          <EmptyState
            icon={CalendarPlus}
            title="No events match your filters"
            description="Try clearing the search or filters, or create a new event to get started."
            action={
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="h-4 w-4" /> Create Event
              </Button>
            }
          />
        </div>
      }
    />
  </div>
);
