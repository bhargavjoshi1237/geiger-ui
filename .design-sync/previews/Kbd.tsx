import { Kbd } from "@geiger/ui";

export const SingleKeys = () => (
  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
    <Kbd>⌘</Kbd>
    <Kbd>⏎</Kbd>
    <Kbd>Esc</Kbd>
    <Kbd>⇧</Kbd>
  </div>
);

export const InText = () => (
  <p style={{ fontSize: 14, color: "var(--foreground)", margin: 0 }}>
    Press <Kbd>Esc</Kbd> to close this dialog.
  </p>
);
