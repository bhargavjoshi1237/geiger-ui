import { Kbd, KbdGroup } from "@geiger/ui";

export const CommandK = () => (
  <KbdGroup>
    <Kbd>⌘</Kbd>
    <Kbd>K</Kbd>
  </KbdGroup>
);

export const Shortcuts = () => (
  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
    <KbdGroup>
      <Kbd>Ctrl</Kbd>
      <Kbd>S</Kbd>
    </KbdGroup>
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>⇧</Kbd>
      <Kbd>P</Kbd>
    </KbdGroup>
  </div>
);
