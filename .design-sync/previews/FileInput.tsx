import { FileInput, Label } from "@geiger/ui";

export const Default = () => (
  <div style={{ width: 340 }}>
    <FileInput accept="image/*" />
  </div>
);

export const WithLabel = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 340 }}>
    <Label htmlFor="cover">Event cover image</Label>
    <FileInput id="cover" accept="image/png,image/jpeg" />
    <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>PNG or JPG, compressed to under 500 KB.</span>
  </div>
);

export const Multiple = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 340 }}>
    <Label htmlFor="attachments">Issue attachments</Label>
    <FileInput id="attachments" multiple />
  </div>
);

export const Disabled = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 340 }}>
    <Label htmlFor="logo">Workspace logo</Label>
    <FileInput id="logo" disabled />
    <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>Only admins can change the logo.</span>
  </div>
);
