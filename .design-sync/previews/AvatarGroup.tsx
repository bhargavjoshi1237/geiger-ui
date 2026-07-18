import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@geiger/ui";

export const Stacked = () => (
  <AvatarGroup>
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="Jordan Diaz" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/80?img=32" alt="Maya Chen" />
      <AvatarFallback>MC</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/80?img=45" alt="Alex Rivera" />
      <AvatarFallback>AR</AvatarFallback>
    </Avatar>
    <AvatarGroupCount>+3</AvatarGroupCount>
  </AvatarGroup>
);

export const Large = () => (
  <AvatarGroup>
    <Avatar size="lg">
      <AvatarImage src="https://i.pravatar.cc/80?img=5" alt="Priya Nair" />
      <AvatarFallback>PN</AvatarFallback>
    </Avatar>
    <Avatar size="lg">
      <AvatarImage src="https://i.pravatar.cc/80?img=8" alt="Sam Okoro" />
      <AvatarFallback>SO</AvatarFallback>
    </Avatar>
    <Avatar size="lg">
      <AvatarFallback>KP</AvatarFallback>
    </Avatar>
    <AvatarGroupCount>+8</AvatarGroupCount>
  </AvatarGroup>
);
