import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Avatar,
  AvatarFallback,
  Badge,
} from "@geiger/ui";

export const TitleAndDescription = () => (
  <Sheet defaultOpen>
    <SheetContent onOpenAutoFocus={(e) => e.preventDefault()}>
      <SheetHeader>
        <SheetTitle>Issue activity</SheetTitle>
        <SheetDescription>
          Every change to GEI-482 across comments, status and assignees.
        </SheetDescription>
      </SheetHeader>
      <div style={{ padding: "0 16px", fontSize: 13, color: "var(--muted-foreground)" }}>
        Jane Cooper moved this to In review · 2h ago
      </div>
    </SheetContent>
  </Sheet>
);

export const ContactHeader = () => (
  <Sheet defaultOpen>
    <SheetContent onOpenAutoFocus={(e) => e.preventDefault()}>
      <SheetHeader style={{ borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, paddingRight: 32 }}>
          <Avatar>
            <AvatarFallback>JC</AvatarFallback>
          </Avatar>
          <div style={{ flex: 1, minWidth: 0 }}>
            <SheetTitle>Jane Cooper</SheetTitle>
            <SheetDescription>jane@acme.com</SheetDescription>
          </div>
          <Badge variant="success">Checked in</Badge>
        </div>
      </SheetHeader>
      <div style={{ padding: "0 16px", fontSize: 13, color: "var(--muted-foreground)" }}>
        Attended 3 events · VIP ticket
      </div>
    </SheetContent>
  </Sheet>
);
