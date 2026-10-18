import { Button, ScreenHeader } from "@geiger/ui";
import { Download, Plus } from "lucide-react";

export const WithPrimaryAction = () => (
  <div style={{ width: 820 }}>
    <ScreenHeader
      title="All Events"
      description="Every event in your workspace — drafts, on sale, and past. Search, filter, and manage them all from here."
      actions={
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Create Event
        </Button>
      }
    />
  </div>
);

export const MultipleActions = () => (
  <div style={{ width: 820 }}>
    <ScreenHeader
      title="Orders"
      description="Ticket purchases, refunds, and payouts across every event in Acme Conferences."
      actions={
        <>
          <Button variant="outline">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4" /> Manual order
          </Button>
        </>
      }
    />
  </div>
);

export const TitleOnly = () => (
  <div style={{ width: 820 }}>
    <ScreenHeader
      title="Overview"
      description="A snapshot of ticket sales, revenue, and attendance for the last 30 days."
    />
  </div>
);
