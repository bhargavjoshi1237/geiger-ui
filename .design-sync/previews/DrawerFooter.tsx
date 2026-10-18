import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  Button,
} from "@geiger/ui";

export const StackedBottom = () => (
  <Drawer open>
    <DrawerContent onOpenAutoFocus={(e) => e.preventDefault()}>
      <div style={{ width: "100%", maxWidth: 384, margin: "0 auto" }}>
        <DrawerHeader>
          <DrawerTitle>Archive project?</DrawerTitle>
          <DrawerDescription>Platform roadmap will be hidden from your sidebar.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Archive project</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
);

export const RowRight = () => (
  <Drawer open direction="right">
    <DrawerContent onOpenAutoFocus={(e) => e.preventDefault()}>
      <DrawerHeader>
        <DrawerTitle>Filter issues</DrawerTitle>
        <DrawerDescription>Status, assignee and labels.</DrawerDescription>
      </DrawerHeader>
      <DrawerFooter
        style={{ flexDirection: "row", justifyContent: "flex-end", borderTop: "1px solid var(--border)" }}
      >
        <DrawerClose asChild>
          <Button variant="ghost">Reset</Button>
        </DrawerClose>
        <Button>Apply filters</Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);
