import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
  Button,
  Input,
  Label,
} from "@geiger/ui";

export const EditEventRight = () => (
  <Sheet defaultOpen>
    <SheetTrigger asChild>
      <Button variant="outline">Edit event</Button>
    </SheetTrigger>
    <SheetContent onOpenAutoFocus={(e) => e.preventDefault()}>
      <SheetHeader>
        <SheetTitle>Edit event</SheetTitle>
        <SheetDescription>
          Update the details guests see on the Summer Summit 2026 page.
        </SheetDescription>
      </SheetHeader>
      <div style={{ display: "grid", gap: 16, padding: "0 16px" }}>
        <div style={{ display: "grid", gap: 6 }}>
          <Label htmlFor="s-name">Event name</Label>
          <Input id="s-name" defaultValue="Summer Summit 2026" />
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          <Label htmlFor="s-venue">Venue</Label>
          <Input id="s-venue" defaultValue="Pier 27, San Francisco" />
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          <Label htmlFor="s-cap">Capacity</Label>
          <Input id="s-cap" defaultValue="450" />
        </div>
      </div>
      <SheetFooter>
        <Button>Save changes</Button>
        <SheetClose asChild>
          <Button variant="ghost">Cancel</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
);

export const NavigationLeft = () => (
  <Sheet defaultOpen>
    <SheetTrigger asChild>
      <Button variant="outline">Menu</Button>
    </SheetTrigger>
    <SheetContent side="left" onOpenAutoFocus={(e) => e.preventDefault()}>
      <SheetHeader>
        <SheetTitle>Acme Inc.</SheetTitle>
        <SheetDescription>Jump between your Geiger workspaces.</SheetDescription>
      </SheetHeader>
      <div style={{ display: "grid", gap: 4, padding: "0 8px" }}>
        {["Overview", "All events", "Guests", "Billing", "Settings"].map((item) => (
          <Button key={item} variant="ghost" style={{ justifyContent: "flex-start" }}>
            {item}
          </Button>
        ))}
      </div>
    </SheetContent>
  </Sheet>
);

export const AnnouncementBottom = () => (
  <Sheet defaultOpen>
    <SheetTrigger asChild>
      <Button variant="outline">What's new</Button>
    </SheetTrigger>
    <SheetContent side="bottom" onOpenAutoFocus={(e) => e.preventDefault()}>
      <SheetHeader>
        <SheetTitle>Custom subdomains are here</SheetTitle>
        <SheetDescription>
          Serve your event pages from events.yourcompany.com. Add one from Billing.
        </SheetDescription>
      </SheetHeader>
      <SheetFooter style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <SheetClose asChild>
          <Button variant="ghost">Later</Button>
        </SheetClose>
        <Button>Set up domain</Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
);
