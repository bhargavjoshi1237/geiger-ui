import { Switch, Label } from "@geiger/ui";

export const States = () => (
  <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Switch id="s1" defaultChecked />
      <Label htmlFor="s1">Notifications</Label>
    </div>
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Switch id="s2" />
      <Label htmlFor="s2">Auto-save</Label>
    </div>
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Switch id="s3" disabled />
      <Label htmlFor="s3">Beta features</Label>
    </div>
  </div>
);
