"use client";

import {
  ArrowRight,
  Braces,
  BrainCircuit,
  Briefcase,
  Building2,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  ContainerIcon,
  FileText,
  GalleryVerticalEnd,
  Gauge,
  Inbox,
  Layers,
  Megaphone,
  Menu,
  Network,
  Palette,
  PenTool,
  Rocket,
  Route,
  Sparkles,
  Ticket,
  Zap,
} from "lucide-react";
import { Button } from "./button.jsx";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet.jsx";

// Suite-wide products/resources mega menu shared by every landing header.
//
// Every link is a plain <a>, never next/link, and that is deliberate: products
// are served from one domain under per-app basePaths (/notes, /flow, ...), so a
// framework Link would prefix the host app's own basePath and turn a
// cross-product hop like "/flow" into "/notes/flow". Raw anchors resolve against
// the origin, which is what a cross-product link needs — and a full document
// load is correct regardless, since each product is a separate deployment.
export const SUITE_PRODUCTS = [
  { icon: Zap, label: "Notes", description: "Write and collaborate.", href: "/notes", badge: "Pre-alpha" },
  { icon: ContainerIcon, label: "Flow", description: "Plan and track work.", href: "/flow", badge: "Pre-alpha" },
  { icon: Layers, label: "Assets", description: "Manage your media.", href: "/assets" },
  { icon: BrainCircuit, label: "Grey", description: "Managed RAG and knowledge graphs.", href: "/grey" },
  { icon: FileText, label: "Forms", description: "Build forms and surveys.", href: "/forms" },
  { icon: CalendarDays, label: "Events", description: "Organise & manage events.", href: "/events", badge: "Pre-alpha" },
  { icon: GalleryVerticalEnd, label: "Content", description: "Personalized feeds that learn taste.", href: "/content" },
  { icon: Megaphone, label: "Campaign", description: "Run marketing campaigns.", href: "/campaign" },
  { icon: Network, label: "Pods", description: "API gateway for your services.", href: "/pods" },
  { icon: Building2, label: "Property", description: "Manage real estate.", href: "/property" },
];

// Marketing pages served by the dash at the domain root, grouped by who they're for; pass `solutions={null}` to hide the menu.
export const SUITE_SOLUTIONS = {
  groups: [
    {
      label: "Teams",
      items: [
        { icon: Briefcase, label: "Corporate", description: "Every department, one structure.", href: "/teams/corporate" },
        { icon: Palette, label: "Creative", description: "In-house brand and creative teams.", href: "/teams/creative" },
        { icon: Gauge, label: "Management", description: "Every project in one view.", href: "/teams/management" },
      ],
    },
    {
      label: "Built for",
      items: [
        { icon: Ticket, label: "Event organisers", description: "Fill the room, then run the door.", href: "/for/event-organisers" },
        { icon: PenTool, label: "Creative studios", description: "From client brief to final file.", href: "/for/creative-studios" },
        { icon: ClipboardList, label: "Operations teams", description: "Every request answered and tracked.", href: "/for/operations" },
        { icon: Braces, label: "Developers", description: "APIs for content, files and answers.", href: "/for/developers" },
      ],
    },
    {
      label: "Product areas",
      items: [
        { icon: Inbox, label: "Intake and inboxes", description: "Every request has somewhere to land.", href: "/intake" },
        { icon: Route, label: "Planning", description: "From first sketch to launch.", href: "/plan" },
        { icon: Sparkles, label: "AI and automation", description: "Put your team's knowledge to work.", href: "/ai" },
        { icon: Rocket, label: "Publish and sell", description: "Ship it to the people it's for.", href: "/launch" },
      ],
    },
  ],
  tours: [
    { label: "Events", href: "/apps/events/ticketing" },
    { label: "Notes", href: "/apps/notes/canvas" },
    { label: "Flow", href: "/apps/flow/issues" },
    { label: "Forms", href: "/apps/forms/builder" },
    { label: "Grey", href: "/apps/grey/knowledge-bases" },
    { label: "Content", href: "/apps/content/modelling" },
    { label: "Assets", href: "/apps/assets/library" },
    { label: "Property", href: "/apps/property/leasing" },
  ],
  hub: { label: "All solutions", href: "/solutions" },
};

export const SUITE_RESOURCES = [
  { label: "Features", href: "/features" },
  { label: "Documentation", href: "/help" },
  { label: "Changelog", href: "/changelog" },
  { label: "Blog", href: "/blog" },
];

function ProductBadge({ children, className = "" }) {
  return (
    <span
      className={`rounded-full border border-border px-1.5 py-px font-medium uppercase tracking-wide text-muted-foreground ${className}`}
    >
      {children}
    </span>
  );
}

export function SuiteMegaMenu({
  userId = null,
  products = SUITE_PRODUCTS,
  solutions = SUITE_SOLUTIONS,
  resources = SUITE_RESOURCES,
  pricingHref = "/pricing",
  signInHref = "/login",
  dashboardHref = "/org",
  logoSrc = "/logo1.svg",
}) {
  // Hover opens the panels; focus keeps them open for keyboard users. Drop focus
  // on leave so a panel isn't left pinned open after the pointer has gone.
  const closeMenuOnMouseLeave = (event) => {
    const focused = document.activeElement;
    if (focused instanceof HTMLElement && event.currentTarget.contains(focused)) {
      focused.blur();
    }
  };

  return (
    <>
      <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
        <div className="group relative" onMouseLeave={closeMenuOnMouseLeave}>
          <button
            type="button"
            aria-haspopup="true"
            className="flex items-center gap-1 py-6 transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
          >
            Products
            <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
          </button>

          <div className="invisible absolute left-1/2 top-full w-[650px] -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
            <div className="rounded-xl border border-border bg-surface-subtle p-4 shadow-xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Products</p>
              <div className="grid grid-cols-3 gap-1">
                {products.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      href={item.href}
                      key={item.label}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-surface-hover focus-visible:bg-surface-hover focus-visible:outline-none"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <div className="min-w-0">
                        <p className="flex items-center gap-1.5 text-sm text-foreground">
                          {item.label}
                          {item.badge ? <ProductBadge className="text-[9px]">{item.badge}</ProductBadge> : null}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {solutions ? (
          // Not `relative`: the wide panel centres on the nav instead of its trigger, so it stays on screen at every desktop width.
          <div className="group" onMouseLeave={closeMenuOnMouseLeave}>
            <button
              type="button"
              aria-haspopup="true"
              className="flex items-center gap-1 py-6 transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
            >
              Solutions
              <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
            </button>

            <div className="invisible absolute left-1/2 top-full w-[760px] max-w-[calc(100vw-2rem)] -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="overflow-hidden rounded-xl border border-border bg-surface-subtle shadow-xl">
                <div className="grid grid-cols-3 gap-2 p-4">
                  {solutions.groups.map((group) => (
                    <div key={group.label} className="min-w-0">
                      <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{group.label}</p>
                      <div className="space-y-0.5">
                        {group.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <a
                              href={item.href}
                              key={item.href}
                              className="flex items-start gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-surface-hover focus-visible:bg-surface-hover focus-visible:outline-none"
                            >
                              {Icon ? <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" /> : null}
                              <div className="min-w-0">
                                <p className="text-sm text-foreground">{item.label}</p>
                                {item.description ? (
                                  <p className="text-xs leading-snug text-muted-foreground">{item.description}</p>
                                ) : null}
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {solutions.tours?.length || solutions.hub ? (
                  <div className="flex items-center gap-4 border-t border-border bg-foreground/[0.02] px-4 py-3">
                    {solutions.tours?.length ? (
                      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
                        <span className="mr-1 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">App tours</span>
                        {solutions.tours.map((tour) => (
                          <a
                            href={tour.href}
                            key={tour.href}
                            className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground focus-visible:bg-surface-hover focus-visible:text-foreground focus-visible:outline-none"
                          >
                            {tour.label}
                          </a>
                        ))}
                      </div>
                    ) : null}
                    {solutions.hub ? (
                      <a
                        href={solutions.hub.href}
                        className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-surface-hover focus-visible:bg-surface-hover focus-visible:outline-none"
                      >
                        {solutions.hub.label}
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        <div className="group relative" onMouseLeave={closeMenuOnMouseLeave}>
          <button
            type="button"
            aria-haspopup="true"
            className="flex items-center gap-1 py-6 transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
          >
            Resources
            <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
          </button>

          <div className="invisible absolute left-1/2 top-full w-[280px] -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
            <div className="rounded-xl border border-border bg-surface-subtle p-3 shadow-xl">
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Resources</p>
              <div className="space-y-1">
                {resources.map((item) => (
                  <a
                    href={item.href}
                    key={item.label}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground focus-visible:bg-surface-hover focus-visible:text-foreground focus-visible:outline-none"
                  >
                    {item.label}
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <a href={pricingHref} className="py-6 transition-colors hover:text-foreground">
          Pricing
        </a>
      </nav>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground hover:bg-surface-hover hover:text-foreground"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="top"
            className="max-h-[85dvh] overflow-y-auto border-border bg-background text-foreground"
          >
            <SheetHeader className="border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <img src={logoSrc} alt="" className="geiger-logo h-[18px] w-[18px]" />
                <SheetTitle className="mt-0.5">Geiger Studio</SheetTitle>
              </div>
              <SheetDescription className="text-muted-foreground">
                Browse products, solutions, resources, and pricing.
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-6 px-4 pb-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Products</p>
                <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1">
                  {products.map((item) => {
                    const Icon = item.icon;
                    return (
                      <SheetClose asChild key={item.label}>
                        <a
                          href={item.href}
                          className="flex min-w-[86px] flex-col items-center justify-center gap-2 rounded-lg border border-border bg-surface-subtle/50 px-2 py-3 text-center text-xs text-foreground"
                        >
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <p className="leading-tight">{item.label}</p>
                          {item.badge ? <ProductBadge className="text-[8px]">{item.badge}</ProductBadge> : null}
                        </a>
                      </SheetClose>
                    );
                  })}
                </div>
              </div>

              {solutions ? (
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Solutions</p>
                  {solutions.groups.map((group) => (
                    <div key={group.label} className="space-y-1">
                      <p className="text-[11px] font-medium text-muted-foreground">{group.label}</p>
                      <div className="grid grid-cols-2 gap-1">
                        {group.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <SheetClose asChild key={item.href}>
                              <a
                                href={item.href}
                                className="flex min-w-0 items-center gap-2 rounded-lg px-2 py-2 text-sm text-foreground"
                              >
                                {Icon ? <Icon className="h-4 w-4 shrink-0 text-muted-foreground" /> : null}
                                <span className="truncate">{item.label}</span>
                              </a>
                            </SheetClose>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  {solutions.tours?.length ? (
                    <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1">
                      {solutions.tours.map((tour) => (
                        <SheetClose asChild key={tour.href}>
                          <a
                            href={tour.href}
                            className="shrink-0 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                          >
                            {tour.label} tour
                          </a>
                        </SheetClose>
                      ))}
                    </div>
                  ) : null}
                  {solutions.hub ? (
                    <SheetClose asChild>
                      <a
                        href={solutions.hub.href}
                        className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-foreground"
                      >
                        {solutions.hub.label}
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </a>
                    </SheetClose>
                  ) : null}
                </div>
              ) : null}

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Resources</p>
                {resources.map((item) => (
                  <SheetClose asChild key={item.label}>
                    <a
                      href={item.href}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-foreground"
                    >
                      {item.label}
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </a>
                  </SheetClose>
                ))}
              </div>

              <div className="space-y-2">
                <SheetClose asChild>
                  <a
                    href={pricingHref}
                    className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    View Pricing
                  </a>
                </SheetClose>

                <SheetClose asChild>
                  <a
                    href={userId ? dashboardHref : signInHref}
                    className="inline-flex w-full items-center justify-center rounded-lg border border-border-strong bg-transparent px-4 py-2 text-sm font-medium text-foreground"
                  >
                    {userId ? "Open Dashboard" : "Sign In"}
                  </a>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
