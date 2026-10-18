import * as React from "react";
import { SearchBar } from "@geiger/ui";

export const Default = () => {
  const [value, setValue] = React.useState("");
  return (
    <div style={{ width: 320 }}>
      <SearchBar placeholder="Search issues..." value={value} onChange={(e: any) => setValue(e.target.value)} />
    </div>
  );
};

export const WithValue = () => {
  const [value, setValue] = React.useState("billing webhook");
  return (
    <div style={{ width: 320 }}>
      <SearchBar
        placeholder="Search issues..."
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
        onClear={() => setValue("")}
      />
    </div>
  );
};

export const InPanel = () => {
  const [value, setValue] = React.useState("");
  return (
    <div
      style={{
        width: 340,
        border: "1px solid var(--border)",
        borderRadius: 10,
        padding: 12,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <SearchBar placeholder="Search members..." value={value} onChange={(e: any) => setValue(e.target.value)} />
      {["Ada Lovelace · Owner", "Grace Hopper · Admin", "Alan Turing · Member"].map((m) => (
        <div key={m} style={{ fontSize: 13, color: "var(--foreground)", padding: "2px 4px" }}>{m}</div>
      ))}
    </div>
  );
};
