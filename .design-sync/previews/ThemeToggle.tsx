import { ThemeToggle, Button, Avatar, AvatarFallback } from "@geiger/ui";
import { Bell, HelpCircle } from "lucide-react";

export const LightMode = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <ThemeToggle />
    <span style={{ fontSize: 13, color: "var(--muted-foreground)" }}>Switch to dark mode</span>
  </div>
);

// Under a `.dark` ancestor the Sun rotates out and the Moon shows.
export const DarkMode = () => (
  <div
    className="dark"
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 16px",
      borderRadius: 10,
      background: "var(--background)",
      border: "1px solid var(--border)",
    }}
  >
    <ThemeToggle />
    <span style={{ fontSize: 13, color: "var(--muted-foreground)" }}>Switch to light mode</span>
  </div>
);

export const InHeaderActions = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 4,
      padding: "6px 10px",
      borderRadius: 10,
      border: "1px solid var(--border)",
      background: "var(--background)",
    }}
  >
    <Button variant="ghost" size="icon-sm" aria-label="Help" style={{ borderRadius: 9999, color: "var(--muted-foreground)" }}>
      <HelpCircle style={{ width: 18, height: 18 }} />
    </Button>
    <Button variant="ghost" size="icon-sm" aria-label="Notifications" style={{ borderRadius: 9999, color: "var(--muted-foreground)" }}>
      <Bell style={{ width: 18, height: 18 }} />
    </Button>
    <ThemeToggle />
    <Avatar size="sm" style={{ marginLeft: 6 }}>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  </div>
);
