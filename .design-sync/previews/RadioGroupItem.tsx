import { RadioGroup, RadioGroupItem } from "@geiger/ui";

// RadioGroupItem only renders inside a RadioGroup — author the full group.
const Option = ({ value, label }: { value: string; label: string }) => (
  <label htmlFor={`vis-${value}`} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
    <RadioGroupItem value={value} id={`vis-${value}`} />
    <span style={{ fontSize: 14, color: "var(--foreground)" }}>{label}</span>
  </label>
);

export const Options = () => (
  <RadioGroup defaultValue="workspace" style={{ width: 280 }}>
    <Option value="private" label="Private — only you" />
    <Option value="workspace" label="Workspace — all members" />
    <Option value="public" label="Public — anyone with the link" />
  </RadioGroup>
);
