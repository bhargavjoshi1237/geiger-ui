import { ScrollArea } from "@geiger/ui";

// ScrollBar is rendered internally by ScrollArea — the visible track/thumb below
// is that component. A tall list keeps the vertical scrollbar prominent.
const rows = Array.from({ length: 20 }, (_, i) => ({
  name: `Member ${i + 1}`,
  role: i % 3 === 0 ? "Admin" : i % 3 === 1 ? "Editor" : "Viewer",
}));

export const Vertical = () => (
  <ScrollArea
    style={{ height: 180, width: 280 }}
    className="rounded-md border border-border bg-surface-subtle"
  >
    <div style={{ padding: 12 }}>
      {rows.map((r) => (
        <div
          key={r.name}
          style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "7px 0", borderTop: "1px solid var(--border)" }}
        >
          <span style={{ color: "var(--foreground)" }}>{r.name}</span>
          <span style={{ color: "var(--muted-foreground)" }}>{r.role}</span>
        </div>
      ))}
    </div>
  </ScrollArea>
);
