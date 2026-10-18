import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  Button,
} from "@geiger/ui";

export const SeatsBottom = () => (
  <Drawer open>
    <DrawerTrigger asChild>
      <Button variant="outline">Adjust seats</Button>
    </DrawerTrigger>
    <DrawerContent onOpenAutoFocus={(e) => e.preventDefault()}>
      <div style={{ width: "100%", maxWidth: 384, margin: "0 auto" }}>
        <DrawerHeader>
          <DrawerTitle>Team seats</DrawerTitle>
          <DrawerDescription>Billed at $12 per seat each month.</DrawerDescription>
        </DrawerHeader>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            padding: 16,
          }}
        >
          <Button variant="outline" size="icon" aria-label="Remove seat">
            −
          </Button>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 40, fontWeight: 700, lineHeight: 1 }}>8</div>
            <div style={{ fontSize: 12, color: "var(--muted-foreground)" }}>seats</div>
          </div>
          <Button variant="outline" size="icon" aria-label="Add seat">
            +
          </Button>
        </div>
        <DrawerFooter>
          <Button>Update plan</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
);

export const DetailsRight = () => (
  <Drawer open direction="right">
    <DrawerTrigger asChild>
      <Button variant="outline">View guest</Button>
    </DrawerTrigger>
    <DrawerContent onOpenAutoFocus={(e) => e.preventDefault()}>
      <DrawerHeader>
        <DrawerTitle>Jane Cooper</DrawerTitle>
        <DrawerDescription>VIP ticket · Summer Summit 2026</DrawerDescription>
      </DrawerHeader>
      <div style={{ display: "grid", gap: 8, padding: "0 16px", fontSize: 14 }}>
        <div>jane@acme.com</div>
        <div style={{ color: "var(--muted-foreground)" }}>Checked in at 09:12</div>
      </div>
      <DrawerFooter>
        <Button>Resend ticket</Button>
        <DrawerClose asChild>
          <Button variant="outline">Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);
