import { Textarea, Label } from "@geiger/ui";

export const Default = () => (
  <div style={{ width: 320 }}>
    <Textarea defaultValue="Thanks for the quick turnaround on this release." />
  </div>
);

export const WithPlaceholder = () => (
  <div style={{ width: 320 }}>
    <Textarea placeholder="Share your feedback with the team..." />
  </div>
);

export const Disabled = () => (
  <div style={{ width: 320 }}>
    <Textarea defaultValue="This field is read-only." disabled />
  </div>
);

export const WithLabel = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 320 }}>
    <Label htmlFor="notes">Release notes</Label>
    <Textarea id="notes" placeholder="Summarize what changed in this version..." />
  </div>
);
