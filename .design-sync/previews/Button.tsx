import { Button } from "@geiger/ui";
import { ArrowRight, Plus, Trash2 } from "lucide-react";

export const Variants = () => (
  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
    <Button>Save changes</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="destructive">Delete</Button>
    <Button variant="link">Learn more</Button>
  </div>
);

export const Sizes = () => (
  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
    <Button size="sm">Small</Button>
    <Button size="default">Default</Button>
    <Button size="lg">Large</Button>
    <Button size="icon" aria-label="Add">
      <Plus />
    </Button>
  </div>
);

export const WithIcons = () => (
  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
    <Button>
      <Plus /> New project
    </Button>
    <Button variant="secondary">
      Continue <ArrowRight />
    </Button>
    <Button variant="destructive">
      <Trash2 /> Delete
    </Button>
  </div>
);

export const Disabled = () => (
  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
    <Button disabled>Disabled</Button>
    <Button variant="outline" disabled>
      Disabled
    </Button>
  </div>
);
