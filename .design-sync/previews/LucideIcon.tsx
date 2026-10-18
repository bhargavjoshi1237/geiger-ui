import { LucideIcon } from "@geiger/ui";

const NAMES = ["Rocket", "GraduationCap", "CalendarDays", "Ticket", "FolderKanban", "Users", "CreditCard", "Megaphone"];

export const ByName = () => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 88px)", gap: 12 }}>
    {NAMES.map((name) => (
      <div
        key={name}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          padding: "12px 4px",
          border: "1px solid var(--border)",
          borderRadius: 8,
        }}
      >
        <LucideIcon name={name} className="size-5 text-foreground" />
        <span style={{ fontSize: 11, color: "var(--muted-foreground)" }}>{name}</span>
      </div>
    ))}
  </div>
);

export const InlineWithLabel = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 10, width: 260 }}>
    {[
      { icon: "folder-kanban", label: "Mobile app redesign" },
      { icon: "calendar-days", label: "Design summit 2026" },
      { icon: "credit-card", label: "Billing migration" },
    ].map((row) => (
      <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--foreground)" }}>
        <LucideIcon name={row.icon} className="size-4 text-muted-foreground" />
        {row.label}
      </div>
    ))}
  </div>
);

export const Fallback = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--foreground)" }}>
    <LucideIcon name="NotARealIcon" className="size-5 text-muted-foreground" />
    <span>Unknown name falls back to the Shapes glyph</span>
  </div>
);
