import * as React from "react";
import { IconPicker, Label } from "@geiger/ui";

// IconPicker keeps its open state internal, so the Open cell clicks its own trigger once mounted.
export const Open = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [value, setValue] = React.useState("Rocket");
  React.useEffect(() => {
    const t = setTimeout(() => {
      ref.current?.querySelector<HTMLButtonElement>("[data-slot=icon-picker-trigger]")?.click();
    }, 50);
    return () => clearTimeout(t);
  }, []);
  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 8, width: 340 }}>
      <Label>Project icon</Label>
      <IconPicker value={value} onValueChange={setValue} />
    </div>
  );
};

export const Closed = () => {
  const [a, setA] = React.useState("GraduationCap");
  const [b, setB] = React.useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 300 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Label>Course icon</Label>
        <IconPicker value={a} onValueChange={setA} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Label>Category icon</Label>
        <IconPicker value={b} onValueChange={setB} placeholder="Choose an icon" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Label>Locked icon</Label>
        <IconPicker value="Lock" disabled />
      </div>
    </div>
  );
};
