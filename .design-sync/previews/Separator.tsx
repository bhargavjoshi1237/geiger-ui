import { Separator } from "@geiger/ui";

export const Horizontal = () => (
  <div style={{ width: 280 }}>
    <p style={{ fontSize: 14, color: "var(--foreground)", margin: 0 }}>
      Radix Primitives
    </p>
    <p style={{ fontSize: 13, color: "var(--muted-foreground)", margin: "2px 0 0" }}>
      An open-source UI component library.
    </p>
    <Separator style={{ margin: "12px 0" }} />
    <p style={{ fontSize: 13, color: "var(--muted-foreground)", margin: 0 }}>
      Accessible and unstyled by default.
    </p>
  </div>
);

export const Vertical = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      height: 20,
      fontSize: 14,
      color: "var(--foreground)",
    }}
  >
    <span>Docs</span>
    <Separator orientation="vertical" />
    <span>Components</span>
    <Separator orientation="vertical" />
    <span>Themes</span>
  </div>
);
