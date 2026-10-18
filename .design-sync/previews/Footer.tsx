import { Footer } from "@geiger/ui";

export const LandingFooter = () => (
  <div style={{ width: "100%", overflow: "hidden" }}>
    <Footer />
  </div>
);

export const BelowPageContent = () => (
  <div style={{ width: "100%", overflow: "hidden", background: "var(--background)" }}>
    <div
      style={{
        display: "grid",
        justifyItems: "center",
        gap: 8,
        padding: "40px 24px",
        textAlign: "center",
      }}
    >
      <span style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)" }}>
        Ready to run your next event?
      </span>
      <span style={{ fontSize: 14, color: "var(--muted-foreground)" }}>
        Start free — upgrade when your workspace grows.
      </span>
    </div>
    <Footer />
  </div>
);
