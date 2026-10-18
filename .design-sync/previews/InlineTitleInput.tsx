import { useState } from "react";
import { Badge, InlineTitleInput } from "@geiger/ui";

export const PageTitle = () => {
  const [title, setTitle] = useState("Design Systems Summit 2026");
  return (
    <div style={{ width: 640 }}>
      <InlineTitleInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Event name"
        className="text-2xl font-semibold tracking-tight text-foreground"
      />
    </div>
  );
};

export const WithStatus = () => {
  const [title, setTitle] = useState("Q4 launch campaign");
  return (
    <div style={{ width: 640, display: "flex", alignItems: "center", gap: 12 }}>
      <InlineTitleInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Campaign name"
        placeholder="Untitled campaign"
        size={1}
        className="text-2xl font-semibold tracking-tight text-foreground"
      />
      <Badge variant="warning">Draft</Badge>
    </div>
  );
};

export const EmptyPlaceholder = () => {
  const [title, setTitle] = useState("");
  return (
    <div style={{ width: 640 }}>
      <InlineTitleInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Untitled document"
        aria-label="Document title"
        className="text-2xl font-semibold tracking-tight text-foreground placeholder:text-muted-foreground"
      />
    </div>
  );
};
