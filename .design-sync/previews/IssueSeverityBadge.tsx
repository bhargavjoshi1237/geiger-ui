import { IssueSeverityBadge } from "@geiger/ui";

export const AllSeverities = () => (
  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
    <IssueSeverityBadge severity="critical" />
    <IssueSeverityBadge severity="high" />
    <IssueSeverityBadge severity="medium" />
    <IssueSeverityBadge severity="low" />
  </div>
);

const rows = [
  { key: "FLOW-231", title: "Checkout fails with promo code", severity: "critical" },
  { key: "FLOW-224", title: "Ticket QR codes blurry on Android", severity: "high" },
  { key: "FLOW-219", title: "Calendar export ignores time zone", severity: "medium" },
  { key: "FLOW-202", title: "Typo in billing reminder email", severity: "low" },
];

export const InIssueList = () => (
  <div
    style={{
      width: 420,
      border: "1px solid var(--border)",
      borderRadius: 12,
      overflow: "hidden",
      background: "var(--background)",
    }}
  >
    {rows.map((r, i) => (
      <div
        key={r.key}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "10px 14px",
          borderTop: i === 0 ? "none" : "1px solid var(--border)",
          fontSize: 14,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 500, color: "var(--foreground)" }}>{r.title}</div>
          <div style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{r.key}</div>
        </div>
        <IssueSeverityBadge severity={r.severity} />
      </div>
    ))}
  </div>
);
