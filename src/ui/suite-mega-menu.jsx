"use client";

import {
  ArrowRight,
  Building2,
  CalendarDays,
  ChevronDown,
  ContainerIcon,
  Cpu,
  FileSignature,
  FileText,
  Headset,
  Layers,
  LayoutGrid,
  Megaphone,
  Menu,
  MessageSquare,
  PenTool,
  Webhook,
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
  { icon: ContainerIcon, label: "Flow", description: "Plan and track work.", href: "/flow" },
  { icon: Layers, label: "Assets", description: "Manage your media.", href: "/assets" },
  { icon: Cpu, label: "Grey", description: "AI workspace tools.", href: "/grey" },
  { icon: FileText, label: "Forms", description: "Build forms and surveys.", href: "/forms" },
  { icon: CalendarDays, label: "Events", description: "Organise & manage events.", href: "/events", badge: "Pre-alpha" },
  { icon: LayoutGrid, label: "Content", description: "Your content operating system.", href: "/content" },
  { icon: Megaphone, label: "Campaign", description: "Run marketing campaigns.", href: "/campaign" },
  { icon: Webhook, label: "Pods", description: "Edge functions for API calls.", href: "/pods" },
  { icon: Headset, label: "Comms", description: "Message and support customers.", href: "/comms" },
  { icon: MessageSquare, label: "Chat", description: "Messaging and hangout.", href: "/chat", badge: "Pre-alpha" },
  { icon: PenTool, label: "Canvas", description: "Visual colab workspace.", href: "/canvas" },
  { icon: FileSignature, label: "Docs", description: "Send and sign documents.", href: "/docs" },
  { icon: Building2, label: "Property", description: "Manage real estate.", href: "/property" },
];

export const SUITE_RESOURCES = [
  { label: "Solutions", href: "/solutions" },
  { label: "Features", href: "/features" },
  { label: "Documentation", href: "/docs" },
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
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground0">Products</p>
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
                        <p className="truncate text-xs text-foreground0">{item.description}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

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
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-foreground0">Resources</p>
              <div className="space-y-1">
                {resources.map((item) => (
                  <a
                    href={item.href}
                    key={item.label}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground focus-visible:bg-surface-hover focus-visible:text-foreground focus-visible:outline-none"
                  >
                    {item.label}
                    <ArrowRight className="h-3.5 w-3.5 text-foreground0" />
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
                <img src={logoSrc} alt="" className="h-[18px] w-[18px]" />
                <SheetTitle className="mt-0.5">Geiger Studio</SheetTitle>
              </div>
              <SheetDescription className="text-foreground0">
                Browse products, resources, and pricing.
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-6 px-4 pb-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-foreground0">Products</p>
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

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-foreground0">Resources</p>
                {resources.map((item) => (
                  <SheetClose asChild key={item.label}>
                    <a
                      href={item.href}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-foreground"
                    >
                      {item.label}
                      <ArrowRight className="h-4 w-4 text-foreground0" />
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
