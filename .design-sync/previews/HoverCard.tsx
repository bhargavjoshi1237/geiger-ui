import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  Avatar,
  AvatarFallback,
  Badge,
} from "@geiger/ui";
import { CalendarDays, FolderKanban } from "lucide-react";

const link = { fontSize: 14, fontWeight: 500, textDecoration: "underline" } as const;

export const MemberProfile = () => (
  <HoverCard defaultOpen>
    <HoverCardTrigger asChild>
      <a href="#" style={link}>
        @jane.cooper
      </a>
    </HoverCardTrigger>
    <HoverCardContent align="start">
      <div style={{ display: "flex", gap: 12 }}>
        <Avatar>
          <AvatarFallback>JC</AvatarFallback>
        </Avatar>
        <div style={{ display: "grid", gap: 4 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Jane Cooper</div>
          <div style={{ fontSize: 13, color: "var(--muted-foreground)" }}>
            Product lead at Acme. Owns the Platform roadmap.
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              color: "var(--muted-foreground)",
              marginTop: 4,
            }}
          >
            <CalendarDays size={14} />
            Joined March 2025
          </div>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
);

export const ProjectSummary = () => (
  <HoverCard defaultOpen>
    <HoverCardTrigger asChild>
      <a href="#" style={link}>
        Platform roadmap
      </a>
    </HoverCardTrigger>
    <HoverCardContent align="start">
      <div style={{ display: "grid", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FolderKanban size={16} />
          <span style={{ fontSize: 14, fontWeight: 600 }}>Platform roadmap</span>
          <Badge variant="success">Active</Badge>
        </div>
        <div style={{ fontSize: 13, color: "var(--muted-foreground)" }}>
          42 open issues · 8 members · updated 2h ago
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
);
