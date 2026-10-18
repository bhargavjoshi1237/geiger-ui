import { Button, EmptyState } from "@geiger/ui";
import { CalendarPlus, Inbox, Plus, SearchX } from "lucide-react";

export const NoRowsYet = () => (
  <div className="rounded-xl border border-border bg-surface-subtle" style={{ width: 560 }}>
    <EmptyState
      icon={CalendarPlus}
      title="No events yet"
      description="Create your first event to start selling tickets and collecting RSVPs."
      action={
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Create Event
        </Button>
      }
    />
  </div>
);

export const FilteredEmpty = () => (
  <div className="rounded-xl border border-border bg-surface-subtle" style={{ width: 560 }}>
    <EmptyState
      icon={SearchX}
      title="No orders match your filters"
      description="Try a different date range or clear the search to see every order."
      action={<Button variant="outline">Clear filters</Button>}
    />
  </div>
);

export const Minimal = () => (
  <div className="rounded-xl border border-border bg-surface-subtle" style={{ width: 560 }}>
    <EmptyState icon={Inbox} title="Inbox zero" description="No new messages from attendees." />
  </div>
);
