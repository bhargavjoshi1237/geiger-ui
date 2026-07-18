import { Label, Input } from "@geiger/ui";

export const WithInput = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 280 }}>
    <Label htmlFor="username">Username</Label>
    <Input id="username" placeholder="ada.lovelace" />
  </div>
);

export const Required = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 280 }}>
    <Label htmlFor="workspace">
      Workspace name
      <span style={{ color: "var(--destructive)" }}>*</span>
    </Label>
    <Input id="workspace" placeholder="Acme Inc." />
  </div>
);
