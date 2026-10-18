import { Separator } from "@geiger/ui";

export const Horizontal = () => (
  <div style={{ width: 280 }}>
    <p style={{ fontSize: 14, color: "var(--foreground)", margin: 0 }}>
      Geiger Flow
    </p>
    <p style={{ fontSize: 13, color: "var(--muted-foreground)", margin: "2px 0 0" }}>
      Issues, sprints, and roadmaps for your team.
    </p>
    <Separator style={{ margin: "12px 0" }} />
    <p style={{ fontSize: 13, color: "var(--muted-foreground)", margin: 0 }}>
      12 open issues · 3 due this week
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
    <span>Projects</span>
    <Separator orientation="vertical" />
    <span>Issues</span>
    <Separator orientation="vertical" />
    <span>Settings</span>
  </div>
);
