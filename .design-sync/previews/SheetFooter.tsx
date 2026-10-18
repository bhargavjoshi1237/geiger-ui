import {
  Sheet,
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

export const StackedActions = () => (
  <Sheet defaultOpen>
    <SheetContent onOpenAutoFocus={(e) => e.preventDefault()}>
      <SheetHeader>
        <SheetTitle>Invite teammate</SheetTitle>
        <SheetDescription>They'll get an email to join Acme Inc.</SheetDescription>
      </SheetHeader>
      <div style={{ display: "grid", gap: 6, padding: "0 16px" }}>
        <Label htmlFor="sf-email">Email</Label>
        <Input id="sf-email" defaultValue="alex@acme.com" />
      </div>
      <SheetFooter>
        <Button>Send invite</Button>
        <SheetClose asChild>
          <Button variant="outline">Cancel</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
);

export const DestructiveRow = () => (
  <Sheet defaultOpen>
    <SheetContent onOpenAutoFocus={(e) => e.preventDefault()}>
      <SheetHeader>
        <SheetTitle>Summer Summit 2026</SheetTitle>
        <SheetDescription>450 guests · Pier 27, San Francisco</SheetDescription>
      </SheetHeader>
      <SheetFooter
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderTop: "1px solid var(--border)",
        }}
      >
        <Button variant="destructive">Delete event</Button>
        <div style={{ display: "flex", gap: 8 }}>
          <SheetClose asChild>
            <Button variant="ghost">Close</Button>
          </SheetClose>
          <Button>Publish</Button>
        </div>
      </SheetFooter>
    </SheetContent>
  </Sheet>
);
