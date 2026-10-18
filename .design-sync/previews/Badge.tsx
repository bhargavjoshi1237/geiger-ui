import { Badge } from "@geiger/ui";

export const Variants = () => (
  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
    <Badge>Default</Badge>
    <Badge variant="neutral">Neutral</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="info">Info</Badge>
    <Badge variant="warning">Warning</Badge>
    <Badge variant="danger">Danger</Badge>
    <Badge variant="purple">Purple</Badge>
    <Badge variant="outline">Outline</Badge>
  </div>
);

export const StatusExamples = () => (
  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
    <Badge variant="success">Published</Badge>
    <Badge variant="info">In review</Badge>
    <Badge variant="warning">Pending</Badge>
    <Badge variant="danger">Failed</Badge>
    <Badge variant="outline">Draft</Badge>
  </div>
);
