import * as React from "react";
import { ExpandableSearch, Button } from "@geiger/ui";
import { Plus } from "lucide-react";

const ToolbarRow = ({ children }: { children: any }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 12,
      width: 520,
      padding: "8px 12px",
      border: "1px solid var(--border)",
      borderRadius: 10,
    }}
  >
    <span style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)", whiteSpace: "nowrap", flex: 1 }}>All events</span>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {children}
      <Button size="sm"><Plus /> New event</Button>
    </div>
  </div>
);

export const Collapsed = () => {
  const [value, setValue] = React.useState("");
  return (
    <ToolbarRow>
      <ExpandableSearch value={value} onChange={setValue} placeholder="Search events" open={false} />
    </ToolbarRow>
  );
};

export const Expanded = () => {
  const [value, setValue] = React.useState("");
  return (
    <ToolbarRow>
      <div style={{ width: 224 }}>
        <ExpandableSearch value={value} onChange={setValue} placeholder="Search events" open autoFocus={false} />
      </div>
    </ToolbarRow>
  );
};

export const WithQuery = () => {
  const [value, setValue] = React.useState("Design summit");
  return (
    <ToolbarRow>
      <div style={{ width: 224 }}>
        <ExpandableSearch value={value} onChange={setValue} placeholder="Search events" open autoFocus={false} />
      </div>
    </ToolbarRow>
  );
};
