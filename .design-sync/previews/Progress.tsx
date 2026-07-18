import { Progress } from "@geiger/ui";

const Row = ({ label, value }: { label: string; value: number }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--foreground)" }}>
      <span>{label}</span>
      <span style={{ color: "var(--muted-foreground)" }}>{value}%</span>
    </div>
    <Progress value={value} />
  </div>
);

export const Levels = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
    <Row label="Uploading" value={30} />
    <Row label="Processing" value={66} />
    <Row label="Complete" value={100} />
  </div>
);
