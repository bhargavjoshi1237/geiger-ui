import { Avatar, AvatarImage, AvatarFallback, AvatarBadge } from "@geiger/ui";
import { Check } from "lucide-react";

export const Status = () => (
  <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
    <Avatar size="lg">
      <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="Jordan Diaz" />
      <AvatarFallback>JD</AvatarFallback>
      <AvatarBadge className="bg-emerald-500" />
    </Avatar>
    <Avatar size="lg">
      <AvatarImage src="https://i.pravatar.cc/80?img=32" alt="Maya Chen" />
      <AvatarFallback>MC</AvatarFallback>
      <AvatarBadge className="bg-amber-500" />
    </Avatar>
    <Avatar size="lg">
      <AvatarImage src="https://i.pravatar.cc/80?img=45" alt="Alex Rivera" />
      <AvatarFallback>AR</AvatarFallback>
      <AvatarBadge className="bg-muted-foreground" />
    </Avatar>
  </div>
);

export const Verified = () => (
  <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
    <Avatar size="lg">
      <AvatarImage src="https://i.pravatar.cc/80?img=5" alt="Priya Nair" />
      <AvatarFallback>PN</AvatarFallback>
      <AvatarBadge>
        <Check />
      </AvatarBadge>
    </Avatar>
    <span style={{ fontSize: 13, color: "var(--muted-foreground)" }}>
      Verified account
    </span>
  </div>
);
