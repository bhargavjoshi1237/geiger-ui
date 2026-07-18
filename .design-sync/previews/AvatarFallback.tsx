import { Avatar, AvatarImage, AvatarFallback } from "@geiger/ui";

export const Initials = () => (
  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
    <Avatar>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>MC</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>AR</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>KP</AvatarFallback>
    </Avatar>
  </div>
);

export const BrokenImage = () => (
  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
    <Avatar size="lg">
      <AvatarImage src="https://invalid.example/missing.png" alt="Sam Okoro" />
      <AvatarFallback>SO</AvatarFallback>
    </Avatar>
    <span style={{ fontSize: 13, color: "var(--muted-foreground)" }}>
      Falls back to initials when the image fails to load.
    </span>
  </div>
);
