import { StatusPill } from "@geiger/ui";

// Per-status lookup as kept in an area's constants.js; the dot inherits the variant colour.
const EVENT_STATUS_MAP = {
  "On Sale": { label: "On Sale", variant: "success" },
  "Sold out": { label: "Sold out", variant: "info" },
  Draft: { label: "Draft", variant: "neutral" },
  Scheduled: { label: "Scheduled", variant: "purple" },
  Ended: { label: "Ended", variant: "outline" },
};

const ORDER_STATUS_MAP = {
  pending: { label: "Pending", variant: "warning" },
  failed: { label: "Payment failed", variant: "danger" },
  paid: { label: "Paid", variant: "success" },
  refunded: { label: "Refunded", variant: "outline", dot: false },
};

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>{children}</div>
);

export const EventStatuses = () => (
  <Row>
    {Object.keys(EVENT_STATUS_MAP).map((s) => (
      <StatusPill key={s} status={s} map={EVENT_STATUS_MAP} />
    ))}
  </Row>
);

export const OrderStatuses = () => (
  <Row>
    {Object.keys(ORDER_STATUS_MAP).map((s) => (
      <StatusPill key={s} status={s} map={ORDER_STATUS_MAP} />
    ))}
  </Row>
);

export const UnmappedFallback = () => (
  <Row>
    <StatusPill status="Archived" map={EVENT_STATUS_MAP} />
    <StatusPill status="In review" />
  </Row>
);
