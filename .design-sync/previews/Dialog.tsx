import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  Button,
  Input,
  Label,
} from "@geiger/ui";

export const EditProfile = () => (
  <Dialog defaultOpen>
    <DialogTrigger asChild>
      <Button variant="outline">Edit profile</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Update your account details. Changes are saved to your workspace.
        </DialogDescription>
      </DialogHeader>
      <div style={{ display: "grid", gap: 16 }}>
        <div style={{ display: "grid", gap: 6 }}>
          <Label htmlFor="d-name">Full name</Label>
          <Input id="d-name" defaultValue="Jane Cooper" />
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          <Label htmlFor="d-email">Email</Label>
          <Input id="d-email" type="email" defaultValue="jane@acme.com" />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>
        <Button>Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const DeleteConfirm = () => (
  <Dialog defaultOpen>
    <DialogTrigger asChild>
      <Button variant="destructive">Delete workspace</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete workspace?</DialogTitle>
        <DialogDescription>
          This permanently removes the workspace and all of its data. This
          action cannot be undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>
        <Button variant="destructive">Delete</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
