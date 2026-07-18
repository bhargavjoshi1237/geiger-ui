import { Input, Label } from "@geiger/ui";

export const Default = () => (
  <div style={{ width: 280 }}>
    <Input defaultValue="Ada Lovelace" />
  </div>
);

export const WithPlaceholder = () => (
  <div style={{ width: 280 }}>
    <Input placeholder="you@example.com" type="email" />
  </div>
);

export const Disabled = () => (
  <div style={{ width: 280 }}>
    <Input defaultValue="Cannot edit this" disabled />
  </div>
);

export const WithLabel = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 280 }}>
    <Label htmlFor="email">Email address</Label>
    <Input id="email" type="email" placeholder="you@example.com" />
  </div>
);
