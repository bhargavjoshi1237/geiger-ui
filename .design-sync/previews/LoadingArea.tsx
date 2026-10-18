import { LoadingArea, SectionCard } from "@geiger/ui";

// `name` pins one treatment so the frame is stable; omit it in apps to roll a random one.
export const Panel = () => (
  <div style={{ width: 560 }}>
    <LoadingArea panel name="relay-pulse" size={48} label="Loading events" />
  </div>
);

export const InSectionCard = () => (
  <div style={{ width: 560 }}>
    <SectionCard title="Recent orders" description="The latest ticket purchases across your events." bodyPadding={false}>
      <LoadingArea name="relay-pulse" size={40} label="Loading orders" />
    </SectionCard>
  </div>
);

export const Compact = () => (
  <div style={{ width: 320 }}>
    <LoadingArea panel name="relay-pulse" size={32} label="Loading attendees" />
  </div>
);
