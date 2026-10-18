import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@geiger/ui";

export const BottomCentered = () => (
  <Drawer open>
    <DrawerContent onOpenAutoFocus={(e) => e.preventDefault()}>
      <DrawerHeader>
        <DrawerTitle>Share Summer Summit 2026</DrawerTitle>
        <DrawerDescription>Send the event page to guests and speakers.</DrawerDescription>
      </DrawerHeader>
      <div style={{ padding: "0 16px 24px", fontSize: 13, textAlign: "center", color: "var(--muted-foreground)" }}>
        geiger.app/e/summer-summit-2026
      </div>
    </DrawerContent>
  </Drawer>
);

export const RightAligned = () => (
  <Drawer open direction="right">
    <DrawerContent onOpenAutoFocus={(e) => e.preventDefault()}>
      <DrawerHeader style={{ borderBottom: "1px solid var(--border)" }}>
        <DrawerTitle>Notifications</DrawerTitle>
        <DrawerDescription>3 unread across your workspaces.</DrawerDescription>
      </DrawerHeader>
      <div style={{ display: "grid", gap: 12, padding: 16, fontSize: 13 }}>
        <div>Jane Cooper assigned you GEI-482</div>
        <div>12 new registrations for Summer Summit</div>
        <div>Invoice #1043 was paid</div>
      </div>
    </DrawerContent>
  </Drawer>
);
