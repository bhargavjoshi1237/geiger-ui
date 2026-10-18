import { useState } from "react";
import { SearchInput } from "@geiger/ui";

export const ExpandedWithValue = () => {
  const [value, setValue] = useState("Design Systems Summit");
  return (
    <div style={{ width: 360 }}>
      <SearchInput expanded value={value} onChange={setValue} placeholder="Search events, venues, cities…" />
    </div>
  );
};

export const ExpandedEmpty = () => {
  const [value, setValue] = useState("");
  return (
    <div style={{ width: 360 }}>
      <SearchInput expanded value={value} onChange={setValue} placeholder="Search attendees by name or email…" />
    </div>
  );
};

export const Collapsed = () => {
  const [value, setValue] = useState("");
  return (
    <div style={{ width: 360, display: "flex", alignItems: "center" }}>
      <span className="text-sm font-semibold text-foreground">Recent orders</span>
      <SearchInput value={value} onChange={setValue} placeholder="Search orders…" />
    </div>
  );
};
