import { RadioGroup, RadioGroupItem } from "@geiger/ui";

const Option = ({ value, label, hint }: { value: string; label: string; hint: string }) => (
  <label htmlFor={value} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
    <RadioGroupItem value={value} id={value} style={{ marginTop: 2 }} />
    <span style={{ display: "flex", flexDirection: "column" }}>
      <span style={{ fontSize: 14, color: "var(--foreground)" }}>{label}</span>
      <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{hint}</span>
    </span>
  </label>
);

export const PlanPicker = () => (
  <RadioGroup defaultValue="pro" style={{ width: 320 }}>
    <Option value="starter" label="Starter" hint="For individuals getting going" />
    <Option value="pro" label="Pro" hint="For growing teams and workflows" />
    <Option value="enterprise" label="Enterprise" hint="Advanced controls and SSO" />
  </RadioGroup>
);
