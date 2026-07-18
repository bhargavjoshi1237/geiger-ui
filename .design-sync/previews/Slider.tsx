import { Slider } from "@geiger/ui";

export const Single = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 320 }}>
    <span style={{ fontSize: 13, color: "var(--foreground)" }}>Volume</span>
    <Slider defaultValue={[50]} max={100} step={1} />
  </div>
);

export const Range = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 320 }}>
    <span style={{ fontSize: 13, color: "var(--foreground)" }}>Price range</span>
    <Slider defaultValue={[25, 75]} max={100} step={1} />
  </div>
);
