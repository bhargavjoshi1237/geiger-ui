import { Badge } from "@geiger/ui";

export const Variants = () => (
  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
    <Badge>Default</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="destructive">Destructive</Badge>
    <Badge variant="outline">Outline</Badge>
    <Badge variant="success">Success</Badge>
  </div>
);

export const StatusExamples = () => (
  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
    <Badge variant="success">Active</Badge>
    <Badge variant="secondary">Pending</Badge>
    <Badge variant="destructive">Failed</Badge>
    <Badge variant="outline">Draft</Badge>
  </div>
);
