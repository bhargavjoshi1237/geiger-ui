import { Slider } from "@geiger/ui";

export const Single = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 320 }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
      <span style={{ color: "var(--foreground)" }}>Seats</span>
      <span style={{ color: "var(--muted-foreground)" }}>24 of 50</span>
    </div>
    <Slider defaultValue={[24]} max={50} step={1} />
  </div>
);

export const Range = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 320 }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
      <span style={{ color: "var(--foreground)" }}>Event capacity</span>
      <span style={{ color: "var(--muted-foreground)" }}>150 – 400 guests</span>
    </div>
    <Slider defaultValue={[150, 400]} max={500} step={10} />
  </div>
);
