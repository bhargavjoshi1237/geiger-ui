import * as React from "react";
import {
  Sidebar,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarInput,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  Avatar,
  AvatarFallback,
  Logo,
} from "@geiger/ui";
import {
  LayoutDashboard,
  CalendarDays,
  Ticket,
  BarChart3,
  Megaphone,
  Search,
  Plus,
  ChevronsUpDown,
  ChevronDown,
  ChevronRight,
  Sparkles,
} from "lucide-react";

type ShellProps = {
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
  defaultOpen?: boolean;
  searchValue?: string;
  loading?: boolean;
  subSize?: "sm" | "md";
  activeSub?: string;
  activeItem?: string;
  groupActions?: boolean;
  footer?: "user" | "upgrade";
  title?: string;
};

const WORKSPACE = [
  { title: "Overview", icon: LayoutDashboard },
  {
    title: "Events",
    icon: CalendarDays,
    badge: "12",
    sub: ["All Events", "Templates", "Event Series"],
  },
  { title: "Tickets", icon: Ticket, badge: "3" },
];

const INSIGHTS = [
  { title: "Analytics", icon: BarChart3 },
  { title: "Campaigns", icon: Megaphone, badge: "New" },
];

function Shell({
  variant = "sidebar",
  collapsible = "offcanvas",
  defaultOpen = true,
  searchValue,
  loading = false,
  subSize = "md",
  activeSub = "All Events",
  activeItem = "Events",
  groupActions = false,
  footer = "user",
  title = "All Events",
}: ShellProps) {
  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={{ height: "calc(100vh - 48px)", minHeight: 520, overflow: "hidden" }}
    >
      <Sidebar variant={variant} collapsible={collapsible}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <div
                  style={{
                    display: "flex",
                    width: 32,
                    height: 32,
                    flexShrink: 0,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                    background: "var(--sidebar-primary)",
                    color: "var(--sidebar-primary-foreground)",
                  }}
                >
                  <Logo size={16} />
                </div>
                <div style={{ display: "grid", flex: 1, minWidth: 0, lineHeight: 1.2 }}>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>Geiger Events</span>
                  <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>
                    Acme Summit 2026
                  </span>
                </div>
                <ChevronsUpDown style={{ marginLeft: "auto" }} />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          {collapsible === "icon" && !defaultOpen ? null : (
            <div style={{ position: "relative" }}>
              <Search
                style={{
                  position: "absolute",
                  left: 8,
                  top: 8,
                  width: 16,
                  height: 16,
                  color: "var(--muted-foreground)",
                  pointerEvents: "none",
                }}
              />
              <SidebarInput
                placeholder="Search events…"
                defaultValue={searchValue}
                style={{ paddingLeft: 30 }}
              />
            </div>
          )}
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            {groupActions ? (
              <SidebarGroupAction title="New event">
                <Plus />
                <span className="sr-only">New event</span>
              </SidebarGroupAction>
            ) : null}
            <SidebarGroupContent>
              <SidebarMenu>
                {loading
                  ? [0, 1, 2, 3, 4].map((i) => (
                      <SidebarMenuItem key={i}>
                        <SidebarMenuSkeleton showIcon />
                      </SidebarMenuItem>
                    ))
                  : WORKSPACE.map((item) => {
                      const Icon = item.icon;
                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            isActive={item.title === activeItem}
                            tooltip={item.title}
                          >
                            <Icon />
                            <span>{item.title}</span>
                            {item.sub ? (
                              <ChevronDown style={{ marginLeft: "auto", marginRight: 24 }} />
                            ) : null}
                          </SidebarMenuButton>
                          {item.badge ? (
                            <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                          ) : null}
                          {item.sub ? (
                            <SidebarMenuSub>
                              {item.sub.map((s) => (
                                <SidebarMenuSubItem key={s}>
                                  <SidebarMenuSubButton
                                    href="#"
                                    size={subSize}
                                    isActive={s === activeSub}
                                  >
                                    <span>{s}</span>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          ) : null}
                        </SidebarMenuItem>
                      );
                    })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup style={{ paddingTop: 0 }}>
            <SidebarGroupLabel>Insights</SidebarGroupLabel>
            {groupActions ? (
              <SidebarGroupAction title="New report">
                <Plus />
                <span className="sr-only">New report</span>
              </SidebarGroupAction>
            ) : null}
            <SidebarGroupContent>
              <SidebarMenu>
                {loading
                  ? [0, 1].map((i) => (
                      <SidebarMenuItem key={i}>
                        <SidebarMenuSkeleton />
                      </SidebarMenuItem>
                    ))
                  : INSIGHTS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            isActive={item.title === activeItem}
                            tooltip={item.title}
                          >
                            <Icon />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                          {item.badge ? (
                            <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                          ) : null}
                        </SidebarMenuItem>
                      );
                    })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          {footer === "upgrade" && !(collapsible === "icon" && !defaultOpen) ? (
            <div
              style={{
                display: "grid",
                gap: 6,
                padding: 12,
                borderRadius: 10,
                border: "1px solid var(--sidebar-border)",
                background: "var(--background)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600 }}>
                <Sparkles style={{ width: 14, height: 14 }} />
                Upgrade to Pro
              </div>
              <span style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.4 }}>
                Unlock reserved seating, payouts and unlimited events.
              </span>
            </div>
          ) : null}
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <Avatar size="sm">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div style={{ display: "grid", flex: 1, minWidth: 0, lineHeight: 1.2 }}>
                  <span style={{ fontWeight: 500, fontSize: 13 }}>Jordan Diaz</span>
                  <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>
                    jordan@acme.events
                  </span>
                </div>
                <ChevronsUpDown style={{ marginLeft: "auto" }} />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            height: 48,
            padding: "0 16px",
            borderBottom: "1px solid var(--border)",
            flexShrink: 0,
          }}
        >
          <SidebarTrigger />
          <span style={{ fontSize: 13, color: "var(--muted-foreground)" }}>Events</span>
          <ChevronRight style={{ width: 14, height: 14, color: "var(--muted-foreground)" }} />
          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--foreground)" }}>{title}</span>
        </header>
        <div style={{ display: "grid", gap: 12, padding: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {[
              ["Upcoming", "8"],
              ["Tickets sold", "1,284"],
              ["Revenue", "$42,310"],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  padding: 14,
                  borderRadius: 10,
                  border: "1px solid var(--border)",
                  background: "var(--surface-subtle)",
                }}
              >
                <div style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{label}</div>
                <div style={{ fontSize: 20, fontWeight: 600, color: "var(--foreground)", marginTop: 4 }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              borderRadius: 10,
              border: "1px solid var(--border)",
              background: "var(--surface-subtle)",
              overflow: "hidden",
            }}
          >
            {[
              ["Product Launch Keynote", "Oct 24 · Main Hall", "Published"],
              ["Design Systems Meetup", "Nov 02 · Studio B", "Draft"],
              ["Q4 Customer Summit", "Nov 18 · Pier 27", "Published"],
              ["Holiday Team Offsite", "Dec 12 · Tahoe Lodge", "Scheduled"],
            ].map(([name, meta, status], i) => (
              <div
                key={name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 14px",
                  borderTop: i ? "1px solid var(--border)" : "none",
                }}
              >
                <div style={{ display: "grid", gap: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "var(--foreground)" }}>{name}</span>
                  <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{meta}</span>
                </div>
                <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{status}</span>
              </div>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export const Default = () => <Shell />;

export const Floating = () => <Shell variant="floating" activeItem="Tickets" activeSub="" title="Tickets" />;

export const Inset = () => <Shell variant="inset" activeItem="Analytics" activeSub="" title="Analytics" />;

export const CollapsedToIcons = () => <Shell collapsible="icon" defaultOpen={false} activeItem="Overview" activeSub="" title="Overview" />;

