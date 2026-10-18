import { Checkbox, ResizeHandle } from "@geiger/ui";

const nodeStyle = {
  position: "relative",
  width: 280,
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "var(--background)",
  boxShadow: "0 1px 2px rgb(0 0 0 / 0.06)",
  padding: 16,
  color: "var(--foreground)",
  fontSize: 14,
} as const;

export const OnChecklistNode = () => (
  <div style={nodeStyle}>
    <div style={{ fontWeight: 600, marginBottom: 10 }}>Launch checklist</div>
    {["Confirm venue capacity", "Publish ticket tiers", "Send speaker briefs"].map((label, i) => (
      <label key={label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0" }}>
        <Checkbox checked={i === 0} />
        <span style={{ color: i === 0 ? "var(--muted-foreground)" : "var(--foreground)", textDecoration: i === 0 ? "line-through" : "none" }}>
          {label}
        </span>
      </label>
    ))}
    <ResizeHandle />
  </div>
);

export const OnNoteCard = () => (
  <div style={{ display: "flex", gap: 16 }}>
    <div style={{ ...nodeStyle, width: 220, height: 140 }}>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>Retro notes</div>
      <div style={{ color: "var(--muted-foreground)", fontSize: 13, lineHeight: 1.5 }}>
        Faster deploys after the queue fix. Keep the Friday demo slot.
      </div>
      <ResizeHandle />
    </div>
    <div style={{ ...nodeStyle, width: 160, height: 140, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <div style={{ fontSize: 28, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>14:32</div>
      <div style={{ color: "var(--muted-foreground)", fontSize: 12 }}>Thursday, May 16</div>
      <ResizeHandle />
    </div>
  </div>
);
