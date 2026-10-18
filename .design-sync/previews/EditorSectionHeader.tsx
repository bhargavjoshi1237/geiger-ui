import { Button, EditorSectionHeader } from "@geiger/ui";
import { Plus, Upload } from "lucide-react";

export const WithAction = () => (
  <div style={{ width: 640 }}>
    <EditorSectionHeader
      title="Ticket tiers"
      description="Set prices, quantities, and sale windows for each ticket type."
      action={
        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Add tier
        </Button>
      }
    />
  </div>
);

export const SecondaryAction = () => (
  <div style={{ width: 640 }}>
    <EditorSectionHeader
      title="Cover media"
      description="The hero image shown on the public event page and in share previews."
      action={
        <Button size="sm" variant="outline">
          <Upload className="h-4 w-4" /> Replace image
        </Button>
      }
    />
  </div>
);

export const TitleAndDescription = () => (
  <div style={{ width: 640 }}>
    <EditorSectionHeader
      title="Location & time"
      description="Where and when Design Systems Summit 2026 takes place."
    />
  </div>
);
