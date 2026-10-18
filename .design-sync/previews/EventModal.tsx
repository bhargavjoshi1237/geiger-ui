import * as React from "react";
import { EventModal } from "@geiger/ui";

const KEYNOTE = {
  title: "Product Launch Keynote",
  description: "Opening keynote for the Q4 launch — livestreamed to all regional offices.",
  start: "2026-10-24T09:30:00",
  end: "2026-10-24T11:00:00",
  type: "meeting",
  location: "Main Hall, Pier 27",
};

const noop = () => {};

// EventModal is position:fixed; a viewport-tall frame gives it room inside the card.
const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ position: "relative", width: "100%", height: "calc(100vh - 48px)", minHeight: 420 }}>{children}</div>
);

export const ViewDetails = () => (
  <Frame>
    <EventModal isOpen mode="view" event={KEYNOTE} onClose={noop} onDelete={noop} />
  </Frame>
);

// EditEvent omitted: the edit form's Type <Select> renders empty (src bug in calendar.jsx, see NOTES.md).

export const ViewWithoutDelete = () => (
  <Frame>
    <EventModal
      isOpen
      mode="view"
      event={{
        title: "Speaker Rehearsal",
        start: "2026-10-23T16:00:00",
        end: "2026-10-23T17:30:00",
        location: "Studio A",
      }}
      onClose={noop}
    />
  </Frame>
);
