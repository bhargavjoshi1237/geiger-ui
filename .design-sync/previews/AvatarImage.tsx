import { Avatar, AvatarImage, AvatarFallback } from "@geiger/ui";

export const Photos = () => (
  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
    <Avatar size="lg">
      <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="Jordan Diaz" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
    <Avatar size="lg">
      <AvatarImage src="https://i.pravatar.cc/80?img=32" alt="Maya Chen" />
      <AvatarFallback>MC</AvatarFallback>
    </Avatar>
    <Avatar size="lg">
      <AvatarImage src="https://i.pravatar.cc/80?img=45" alt="Alex Rivera" />
      <AvatarFallback>AR</AvatarFallback>
    </Avatar>
  </div>
);

export const WithLabel = () => (
  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/80?img=5" alt="Priya Nair" />
      <AvatarFallback>PN</AvatarFallback>
    </Avatar>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span style={{ fontSize: 14, fontWeight: 500 }}>Priya Nair</span>
      <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>
        Product designer
      </span>
    </div>
  </div>
);
