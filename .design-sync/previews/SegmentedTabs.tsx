import * as React from "react";
import { SegmentedTabs } from "@geiger/ui";
import { LayoutGrid, List, CalendarDays } from "lucide-react";

export const Default = () => {
  const [value, setValue] = React.useState("upcoming");
  return (
    <SegmentedTabs
      tabs={[
        { label: "Upcoming", value: "upcoming" },
        { label: "Past", value: "past" },
        { label: "Drafts", value: "drafts" },
      ]}
      value={value}
      onChange={setValue}
    />
  );
};

export const WithIcons = () => {
  const [value, setValue] = React.useState("board");
  return (
    <SegmentedTabs
      tabs={[
        { label: "List", value: "list", icon: List },
        { label: "Board", value: "board", icon: LayoutGrid },
        { label: "Calendar", value: "calendar", icon: CalendarDays },
      ]}
      value={value}
      onChange={setValue}
    />
  );
};

export const FullWidth = () => {
  const [value, setValue] = React.useState("Monthly");
  return (
    <div style={{ width: 360 }}>
      <SegmentedTabs tabs={["Monthly", "Yearly"]} value={value} onChange={setValue} fullWidth />
    </div>
  );
};
