import { Toggle } from "@geiger/ui";
import { Bold, Italic, Underline, Star, Pin } from "lucide-react";

const Labeled = ({ label, children }: { label: string; children: any }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
    {children}
    <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{label}</span>
  </div>
);

export const States = () => (
  <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
    <Labeled label="Off">
      <Toggle aria-label="Bold"><Bold /></Toggle>
    </Labeled>
    <Labeled label="On">
      <Toggle aria-label="Bold" defaultPressed><Bold /></Toggle>
    </Labeled>
    <Labeled label="Disabled">
      <Toggle aria-label="Bold" disabled><Bold /></Toggle>
    </Labeled>
  </div>
);

export const Outline = () => (
  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
    <Toggle variant="outline" aria-label="Italic" defaultPressed><Italic /></Toggle>
    <Toggle variant="outline" aria-label="Underline"><Underline /></Toggle>
    <Toggle variant="outline" aria-label="Bold" disabled><Bold /></Toggle>
  </div>
);

export const WithText = () => (
  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
    <Toggle variant="outline" defaultPressed><Star /> Starred</Toggle>
    <Toggle variant="outline"><Pin /> Pin to sidebar</Toggle>
  </div>
);

export const Sizes = () => (
  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
    <Toggle variant="outline" size="sm" aria-label="Small" defaultPressed><Bold /></Toggle>
    <Toggle variant="outline" size="default" aria-label="Default" defaultPressed><Bold /></Toggle>
    <Toggle variant="outline" size="lg" aria-label="Large" defaultPressed><Bold /></Toggle>
  </div>
);
