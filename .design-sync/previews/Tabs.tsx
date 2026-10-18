import { Tabs, TabsList, TabsTrigger, TabsContent } from "@geiger/ui";
import { LayoutDashboard, Ticket, Settings } from "lucide-react";

const Panel = ({ title, body }: { title: string; body: string }) => (
  <div style={{ border: "1px solid var(--border)", borderRadius: 10, padding: 16 }}>
    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)" }}>{title}</div>
    <div style={{ fontSize: 13, color: "var(--muted-foreground)", marginTop: 4 }}>{body}</div>
  </div>
);

export const Default = () => (
  <Tabs defaultValue="overview" style={{ width: 400 }}>
    <TabsList>
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="issues">Issues</TabsTrigger>
      <TabsTrigger value="activity">Activity</TabsTrigger>
    </TabsList>
    <TabsContent value="overview">
      <Panel title="Mobile app redesign" body="12 open issues · 3 members · due Nov 14" />
    </TabsContent>
  </Tabs>
);

export const Line = () => (
  <Tabs defaultValue="tickets" style={{ width: 400 }}>
    <TabsList variant="line">
      <TabsTrigger value="details">Details</TabsTrigger>
      <TabsTrigger value="tickets">Tickets</TabsTrigger>
      <TabsTrigger value="publishing">Publishing</TabsTrigger>
    </TabsList>
    <TabsContent value="tickets">
      <Panel title="General admission" body="240 of 300 sold · $45.00 each" />
    </TabsContent>
  </Tabs>
);

export const WithIcons = () => (
  <Tabs defaultValue="dashboard" style={{ width: 400 }}>
    <TabsList>
      <TabsTrigger value="dashboard"><LayoutDashboard /> Dashboard</TabsTrigger>
      <TabsTrigger value="events"><Ticket /> Events</TabsTrigger>
      <TabsTrigger value="settings" disabled><Settings /> Settings</TabsTrigger>
    </TabsList>
  </Tabs>
);

export const Vertical = () => (
  <Tabs defaultValue="general" orientation="vertical" style={{ width: 420, flexDirection: "row" }}>
    <TabsList>
      <TabsTrigger value="general">General</TabsTrigger>
      <TabsTrigger value="members">Members</TabsTrigger>
      <TabsTrigger value="billing">Billing</TabsTrigger>
    </TabsList>
    <TabsContent value="general">
      <Panel title="Workspace name" body="Geiger Labs, visible to all members" />
    </TabsContent>
  </Tabs>
);
