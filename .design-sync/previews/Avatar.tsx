import { Avatar, AvatarImage, AvatarFallback } from "@geiger/ui";

export const Sizes = () => (
  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
    <Avatar size="sm">
      <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="Jordan Diaz" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="Jordan Diaz" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
    <Avatar size="lg">
      <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="Jordan Diaz" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  </div>
);

export const Fallback = () => (
  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
    <Avatar>
      <AvatarFallback>SM</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>AL</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>KP</AvatarFallback>
    </Avatar>
  </div>
);
