import { RadioGroup, RadioGroupItem } from "@geiger/ui";

// RadioGroupItem only renders inside a RadioGroup — author the full group.
const Option = ({ value, label }: { value: string; label: string }) => (
  <label htmlFor={`ship-${value}`} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
    <RadioGroupItem value={value} id={`ship-${value}`} />
    <span style={{ fontSize: 14, color: "var(--foreground)" }}>{label}</span>
  </label>
);

export const Options = () => (
  <RadioGroup defaultValue="standard" style={{ width: 280 }}>
    <Option value="standard" label="Standard — 5 to 7 days" />
    <Option value="express" label="Express — 2 to 3 days" />
    <Option value="overnight" label="Overnight — next day" />
  </RadioGroup>
);
