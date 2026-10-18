import { LoadingScreen } from "@geiger/ui";

// `name` pins one treatment so the frame is stable; omit it in apps to roll a random one.
export const FullPage = () => (
  <div style={{ width: 820, height: 480, display: "flex" }}>
    <LoadingScreen name="relay-pulse" label="Loading workspace" />
  </div>
);

export const Large = () => (
  <div style={{ width: 820, height: 480, display: "flex" }}>
    <LoadingScreen name="relay-pulse" size={96} label="Loading Design Systems Summit 2026" />
  </div>
);
