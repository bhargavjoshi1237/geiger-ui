import { Logo } from "@geiger/ui";

export const Sizes = () => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: 28 }}>
    {[24, 40, 64].map((s) => (
      <div key={s} style={{ display: "grid", gap: 8, justifyItems: "center" }}>
        <Logo size={s} />
        <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{s}px</span>
      </div>
    ))}
  </div>
);

export const OnBrand = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "16px 20px",
      borderRadius: 10,
      background: "var(--surface-subtle)",
      border: "1px solid var(--border)",
    }}
  >
    <Logo size={28} />
    <div style={{ display: "grid" }}>
      <span style={{ fontSize: 15, fontWeight: 600, color: "var(--foreground)" }}>
        Geiger
      </span>
      <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>
        Built to Manage. Designed to Create.
      </span>
    </div>
  </div>
);
