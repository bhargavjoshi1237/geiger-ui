import { Button, SectionCard, StatusPill, Progress } from "@geiger/ui";
import { Plus } from "lucide-react";

const ORDER_STATUS = {
  paid: { label: "Paid", variant: "success" },
  pending: { label: "Pending", variant: "warning" },
  refunded: { label: "Refunded", variant: "outline" },
};

const ORDERS = [
  { id: "ORD-1042", buyer: "Maya Patel", event: "Design Systems Summit", total: "$298.00", status: "paid" },
  { id: "ORD-1041", buyer: "Liam Chen", event: "Product Week Berlin", total: "$149.00", status: "pending" },
  { id: "ORD-1039", buyer: "Sofia Reyes", event: "Design Systems Summit", total: "$149.00", status: "refunded" },
];

export const WithAction = () => (
  <div style={{ width: 640 }}>
    <SectionCard
      title="Recent orders"
      description="The latest ticket purchases across your events."
      action={<Button size="sm" variant="outline">View all</Button>}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {ORDERS.map((o) => (
          <div key={o.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span className="text-sm font-medium text-foreground">{o.buyer}</span>
              <span className="text-xs text-text-secondary">{o.id} · {o.event}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <StatusPill status={o.status} map={ORDER_STATUS} />
              <span className="text-sm font-semibold text-foreground tabular-nums">{o.total}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  </div>
);

export const TitleOnly = () => (
  <div style={{ width: 640 }}>
    <SectionCard title="Capacity by tier">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {[
          { tier: "General admission", sold: 412, cap: 500 },
          { tier: "VIP", sold: 88, cap: 100 },
          { tier: "Workshop pass", sold: 37, cap: 80 },
        ].map((t) => (
          <div key={t.tier} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="text-sm text-foreground">{t.tier}</span>
              <span className="text-xs text-text-secondary">{t.sold} / {t.cap}</span>
            </div>
            <Progress value={Math.round((t.sold / t.cap) * 100)} />
          </div>
        ))}
      </div>
    </SectionCard>
  </div>
);

export const Bare = () => (
  <div style={{ width: 640 }}>
    <SectionCard
      bare
      title="Speakers"
      description="People presenting at Design Systems Summit 2026."
      action={
        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Add speaker
        </Button>
      }
    >
      <p className="text-sm text-text-secondary" style={{ margin: 0 }}>
        12 speakers confirmed, 3 invitations pending.
      </p>
    </SectionCard>
  </div>
);
