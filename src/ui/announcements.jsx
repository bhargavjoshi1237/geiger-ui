"use client";

// In-app announcements: four formats (modal, corner card, full-screen takeover, multi-step carousel),
// a Studio preview frame, and AnnouncementHost, which picks and shows one per page load.
// Data-agnostic: the host app supplies load() / track() (e.g. Supabase RPCs) and the current pathname.

import * as React from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";

import { cn } from "../lib/utils";
import { Badge } from "./badge";
import { Button } from "./button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./dialog";

export const ANNOUNCEMENT_FORMATS = ["modal", "corner", "takeover", "carousel"];

export const DEFAULT_ANNOUNCEMENT_DESIGN = {
  size: "md",
  position: "bottom-right",
  align: "left",
  imageAspect: "wide",
  imageFit: "cover",
  imageBackground: "muted",
  badgeTone: "info",
  primaryStyle: "default",
  dismissible: true,
  closeOnOutside: true,
  delaySeconds: 0,
  autoAdvanceSeconds: 0,
  showProgress: true,
};

const MODAL_WIDTH = { sm: "sm:max-w-[400px]", md: "sm:max-w-[480px]", lg: "sm:max-w-[600px]" };
const PREVIEW_WIDTH = { sm: "max-w-[400px]", md: "max-w-[480px]", lg: "max-w-[600px]" };
const CORNER_WIDTH = { sm: "w-[300px]", md: "w-[340px]", lg: "w-[400px]" };
const IMAGE_ASPECT = { wide: "aspect-[16/9]", banner: "aspect-[2/1]", tall: "aspect-[4/3]", square: "aspect-square" };
const IMAGE_BACKGROUND = {
  muted: "bg-surface-card",
  light: "bg-white",
  dark: "bg-black",
  none: "bg-transparent",
};
const CORNER_POSITION = {
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
};

export function announcementDesign(announcement) {
  return { ...DEFAULT_ANNOUNCEMENT_DESIGN, ...(announcement?.design || {}) };
}

function announcementSlides(announcement) {
  const slides = Array.isArray(announcement?.slides) ? announcement.slides : [];
  if (!slides.length) return [{}];
  return announcement.format === "carousel" ? slides : slides.slice(0, 1);
}

// "/org/*" matches one segment, "/org/**" matches /org and everything under it, "*" matches any path.
export function matchAnnouncementRoute(pattern, path) {
  const glob = String(pattern || "").trim();
  if (!glob) return false;
  if (glob === "*" || glob === "/**") return true;
  const clean = (value) => (value.length > 1 ? value.replace(/\/+$/, "") : value);
  const source = clean(glob)
    .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\/\*\*$/, "(?:/.*)?")
    .replace(/\*\*/g, ".*")
    .replace(/(?<![.\]])\*/g, "[^/]*");
  return new RegExp(`^${source}$`).test(clean(String(path || "/")));
}

export function announcementAllowedOn(announcement, path) {
  const routes = announcement?.routes || [];
  const excluded = announcement?.excludeRoutes || [];
  if (excluded.some((pattern) => matchAnnouncementRoute(pattern, path))) return false;
  return !routes.length || routes.some((pattern) => matchAnnouncementRoute(pattern, path));
}

function AnnouncementImage({ slide, design, className }) {
  if (!slide?.imageUrl) return null;
  return (
    <div
      className={cn(
        "relative w-full shrink-0 overflow-hidden",
        IMAGE_ASPECT[design.imageAspect] || IMAGE_ASPECT.wide,
        IMAGE_BACKGROUND[design.imageBackground] || IMAGE_BACKGROUND.muted,
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={slide.imageUrl}
        alt={slide.imageAlt || ""}
        className={cn("absolute inset-0 h-full w-full", design.imageFit === "contain" ? "object-contain p-4" : "object-cover")}
      />
    </div>
  );
}

function CloseButton({ onClick, overImage, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close"
      className={cn(
        "absolute right-3 top-3 z-10 flex size-7 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        overImage
          ? "bg-black/70 text-white hover:bg-black/85"
          : "text-text-secondary hover:bg-surface-active hover:text-foreground",
        className,
      )}
    >
      <X className="size-4" />
    </button>
  );
}

function SecondaryLink({ slide, onClick, size }) {
  if (!slide?.secondaryLabel) return <span />;
  return (
    <Button
      type="button"
      variant="ghost"
      size={size}
      onClick={onClick}
      className="-ml-2 text-muted-foreground hover:text-foreground"
    >
      {slide.secondaryLabel}
      {slide.secondaryUrl ? <ArrowUpRight className="size-3.5" /> : null}
    </Button>
  );
}

function ProgressDots({ count, index, onSelect }) {
  if (count < 2) return null;
  return (
    <div className="flex items-center gap-1.5" role="tablist" aria-label="Slides">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === index}
          aria-label={`Slide ${i + 1}`}
          onClick={() => onSelect(i)}
          className={cn(
            "h-1.5 rounded-full transition-all",
            i === index ? "w-4 bg-foreground" : "w-1.5 bg-border-strong hover:bg-muted-foreground",
          )}
        />
      ))}
    </div>
  );
}

// The announcement body for every format. Pure layout: wrappers decide placement and portals.
export function AnnouncementCard({
  announcement,
  index = 0,
  onIndexChange,
  onPrimary,
  onSecondary,
  onClose,
  titleAs: TitleTag = "h2",
  descriptionAs: DescriptionTag = "p",
  className,
}) {
  const design = announcementDesign(announcement);
  const format = announcement?.format || "modal";
  const slides = announcementSlides(announcement);
  const current = Math.min(index, slides.length - 1);
  const slide = slides[current] || {};
  const isCarousel = format === "carousel" && slides.length > 1;
  const isLast = current === slides.length - 1;
  const compact = format === "corner";
  const takeover = format === "takeover";
  const centered = design.align === "center";
  const buttonSize = compact ? "sm" : takeover ? "lg" : "default";

  const goTo = (next) => onIndexChange?.(Math.max(0, Math.min(slides.length - 1, next)));
  const primaryLabel = isCarousel && !isLast ? slide.nextLabel || "Next" : slide.primaryLabel;

  const primary = primaryLabel ? (
    <Button
      type="button"
      size={buttonSize}
      variant={design.primaryStyle === "outline" ? "outline" : design.primaryStyle === "secondary" ? "secondary" : "default"}
      onClick={() => (isCarousel && !isLast ? goTo(current + 1) : onPrimary?.(slide, current))}
    >
      {primaryLabel}
      {isCarousel && !isLast ? <ArrowRight className="size-4" /> : null}
    </Button>
  ) : null;

  const text = (
    <div className={cn("flex min-w-0 flex-col", compact ? "gap-1.5" : "gap-2", centered && "items-center text-center")}>
      {slide.badge ? (
        <Badge variant={design.badgeTone} className="w-fit">
          {slide.badge}
        </Badge>
      ) : null}
      {slide.title ? (
        <TitleTag
          className={cn(
            "font-semibold tracking-[-0.01em] text-foreground",
            compact ? "text-[15px] leading-snug" : takeover ? "text-3xl leading-tight sm:text-4xl" : "text-xl leading-snug sm:text-2xl",
          )}
        >
          {slide.title}
        </TitleTag>
      ) : null}
      {slide.body ? (
        <DescriptionTag
          className={cn(
            "whitespace-pre-line text-muted-foreground",
            compact ? "text-[13px] leading-relaxed" : takeover ? "text-base leading-relaxed sm:text-lg" : "text-sm leading-relaxed",
          )}
        >
          {slide.body}
        </DescriptionTag>
      ) : null}
    </div>
  );

  const footer = (
    <div className={cn("flex items-center gap-3", centered ? "flex-col-reverse" : "justify-between")}>
      {isCarousel && design.showProgress ? (
        <ProgressDots count={slides.length} index={current} onSelect={goTo} />
      ) : (
        <SecondaryLink slide={slide} onClick={() => onSecondary?.(slide, current)} size={compact ? "sm" : "default"} />
      )}
      <div className="flex items-center gap-2">
        {isCarousel && current > 0 ? (
          <Button type="button" variant="ghost" size={buttonSize} onClick={() => goTo(current - 1)} aria-label="Previous slide">
            <ArrowLeft className="size-4" />
          </Button>
        ) : null}
        {isCarousel && design.showProgress && slide.secondaryLabel ? (
          <SecondaryLink slide={slide} onClick={() => onSecondary?.(slide, current)} size={buttonSize} />
        ) : null}
        {primary}
      </div>
    </div>
  );

  const hasImage = Boolean(slide.imageUrl);
  const close = design.dismissible && onClose ? <CloseButton onClick={onClose} overImage={hasImage && !takeover} /> : null;

  if (takeover) {
    return (
      <div className={cn("relative flex h-full w-full flex-col overflow-y-auto bg-background", className)}>
        {close}
        <div
          className={cn(
            "mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-6 py-16 sm:px-10",
            hasImage && "lg:grid-cols-2",
          )}
        >
          {hasImage ? <AnnouncementImage slide={slide} design={design} className="rounded-2xl border border-border" /> : null}
          <div className={cn("flex flex-col gap-8", !hasImage && "mx-auto max-w-2xl")}>
            {text}
            {footer}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-subtle text-foreground shadow-2xl shadow-black/40",
        className,
      )}
    >
      {close}
      <AnnouncementImage slide={slide} design={design} className="border-b border-border" />
      <div className={cn("flex flex-col", compact ? "gap-3 p-4" : "gap-6 p-6", !hasImage && close && "pr-12")}>
        {text}
        {footer}
      </div>
    </div>
  );
}

function useCarouselIndex(announcement) {
  const [index, setIndex] = React.useState(0);
  const seconds = Number(announcementDesign(announcement).autoAdvanceSeconds) || 0;
  const count = announcementSlides(announcement).length;

  React.useEffect(() => {
    if (announcement?.format !== "carousel" || seconds <= 0 || count < 2 || index >= count - 1) return undefined;
    const timer = window.setTimeout(() => setIndex((value) => Math.min(count - 1, value + 1)), seconds * 1000);
    return () => window.clearTimeout(timer);
  }, [announcement?.format, seconds, count, index]);

  return [Math.min(index, count - 1), setIndex];
}

// Live placement for one announcement: Radix dialog for modal/carousel/takeover, a fixed non-modal card for corner.
export function AnnouncementView({ announcement, open, onPrimary, onSecondary, onDismiss }) {
  const design = announcementDesign(announcement);
  const format = announcement?.format || "modal";
  const [index, setIndex] = useCarouselIndex(announcement);
  const slide = announcementSlides(announcement)[index] || {};
  const label = slide.title || "Announcement";

  const handlers = {
    announcement,
    index,
    onIndexChange: setIndex,
    onPrimary: (s, i) => onPrimary?.(s, i),
    onSecondary: (s, i) => onSecondary?.(s, i),
    onClose: () => onDismiss?.(index),
  };

  if (format === "corner") {
    if (!open) return null;
    return (
      <div
        role="dialog"
        aria-label={label}
        className={cn(
          "fixed z-50 max-w-[calc(100vw-2rem)] animate-in fade-in-0 slide-in-from-bottom-4 duration-300",
          CORNER_POSITION[design.position] || CORNER_POSITION["bottom-right"],
          CORNER_WIDTH[design.size] || CORNER_WIDTH.md,
        )}
      >
        <AnnouncementCard {...handlers} />
      </div>
    );
  }

  const blockOutside = (event) => {
    if (!design.dismissible || !design.closeOnOutside) event.preventDefault();
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !next && design.dismissible && onDismiss?.(index)}>
      <DialogContent
        showCloseButton={false}
        {...(slide.body ? {} : { "aria-describedby": undefined })}
        onEscapeKeyDown={(event) => !design.dismissible && event.preventDefault()}
        onPointerDownOutside={blockOutside}
        onInteractOutside={blockOutside}
        className={cn(
          "gap-0 overflow-y-auto rounded-2xl border-0 bg-transparent p-0 shadow-none",
          format === "takeover"
            ? "inset-0 top-0 left-0 h-dvh w-screen max-w-none translate-x-0 translate-y-0 rounded-none sm:max-w-none"
            : cn("max-h-[calc(100dvh-2rem)] max-w-[calc(100vw-2rem)]", MODAL_WIDTH[design.size] || MODAL_WIDTH.md),
        )}
      >
        <DialogTitle className="sr-only">{label}</DialogTitle>
        <AnnouncementCard
          {...handlers}
          titleAs="p"
          descriptionAs={DialogDescription}
          className={format === "takeover" ? "h-dvh" : undefined}
        />
      </DialogContent>
    </Dialog>
  );
}

// Studio preview: the announcement placed inside a mock app frame, with no portals or real side effects.
export function AnnouncementPreview({ announcement, index, onIndexChange, className }) {
  const design = announcementDesign(announcement);
  const format = announcement?.format || "modal";
  const [ownIndex, setOwnIndex] = useCarouselIndex(announcement);
  const current = index ?? ownIndex;
  const setCurrent = onIndexChange ?? setOwnIndex;
  const card = (
    <AnnouncementCard
      announcement={announcement}
      index={current}
      onIndexChange={setCurrent}
      onClose={() => {}}
      onPrimary={() => {}}
      onSecondary={() => {}}
      titleAs="p"
      className={format === "takeover" ? "h-full" : undefined}
    />
  );

  return (
    <div
      className={cn(
        "relative isolate flex min-h-[420px] w-full overflow-hidden rounded-xl border border-border bg-background",
        className,
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 flex flex-col gap-3 p-5 opacity-60">
        <div className="h-3 w-32 rounded-full bg-surface-strong" />
        <div className="grid flex-1 grid-cols-3 gap-3">
          <div className="rounded-lg bg-surface-subtle" />
          <div className="col-span-2 rounded-lg bg-surface-subtle" />
        </div>
      </div>
      {format === "corner" ? (
        <div
          className={cn(
            "absolute max-w-[calc(100%-2rem)]",
            CORNER_POSITION[design.position] || CORNER_POSITION["bottom-right"],
            CORNER_WIDTH[design.size] || CORNER_WIDTH.md,
          )}
        >
          {card}
        </div>
      ) : format === "takeover" ? (
        <div className="absolute inset-0">{card}</div>
      ) : (
        <div className="relative flex w-full items-center justify-center bg-black/40 p-6 backdrop-blur-[2px] dark:bg-black/70">
          <div className={cn("w-full", PREVIEW_WIDTH[design.size] || PREVIEW_WIDTH.md)}>{card}</div>
        </div>
      )}
    </div>
  );
}

const SESSION_PREFIX = "geiger-announcement:";

function seenThisSession(id) {
  try {
    return window.sessionStorage.getItem(SESSION_PREFIX + id) === "1";
  } catch {
    return false;
  }
}

function markSeenThisSession(id) {
  try {
    window.sessionStorage.setItem(SESSION_PREFIX + id, "1");
  } catch {
    // Private mode: the cap just doesn't persist.
  }
}

function openUrl(url, newTab, navigate) {
  if (!url) return;
  if (newTab) {
    window.open(url, "_blank", "noopener,noreferrer");
  } else if (navigate && url.startsWith("/")) {
    navigate(url);
  } else {
    window.location.assign(url);
  }
}

// Shows at most one announcement per page load: the highest-priority match for the current route.
// `userKey` (the signed-in user id) gates loading; `load()` resolves the user's candidates and
// `track(id, kind, { path, slide })` records view / click / dismiss. Failures never surface.
export function AnnouncementHost({ userKey, pathname = "/", load, track, navigate }) {
  const [candidates, setCandidates] = React.useState(null);
  const [active, setActive] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const shownRef = React.useRef(false);
  const pathRef = React.useRef(pathname);

  React.useEffect(() => {
    pathRef.current = pathname;
  }, [pathname]);

  React.useEffect(() => {
    if (!userKey || !load) return undefined;
    let alive = true;
    Promise.resolve()
      .then(load)
      .then((rows) => alive && setCandidates(Array.isArray(rows) ? rows : []))
      .catch(() => alive && setCandidates([]));
    return () => {
      alive = false;
    };
  }, [userKey, load]);

  React.useEffect(() => {
    if (!userKey || !candidates?.length || shownRef.current) return undefined;
    const next = candidates.find(
      (item) => announcementAllowedOn(item, pathname) && !(item.frequency?.mode === "session" && seenThisSession(item.id)),
    );
    if (!next) return undefined;
    const delay = Math.max(0, Number(announcementDesign(next).delaySeconds) || 0) * 1000;
    const timer = window.setTimeout(() => {
      shownRef.current = true;
      markSeenThisSession(next.id);
      setActive(next);
      setOpen(true);
      track?.(next.id, "view", { path: pathRef.current, slide: 0 });
    }, delay);
    return () => window.clearTimeout(timer);
  }, [userKey, candidates, pathname, track]);

  const record = (kind, slide) => {
    if (active) Promise.resolve(track?.(active.id, kind, { path: pathRef.current, slide })).catch(() => {});
  };

  if (!userKey || !active) return null;

  return (
    <AnnouncementView
      key={active.id}
      announcement={active}
      open={open}
      onPrimary={(slide, index) => {
        record("click", index);
        setOpen(false);
        openUrl(slide.primaryUrl, slide.primaryNewTab, navigate);
      }}
      onSecondary={(slide) => {
        // A secondary "Learn more" isn't a conversion; it only closes when it navigates away in this tab.
        const newTab = slide.secondaryNewTab ?? true;
        if (!newTab) setOpen(false);
        openUrl(slide.secondaryUrl, newTab, navigate);
      }}
      onDismiss={(index) => {
        record("dismiss", index);
        setOpen(false);
      }}
    />
  );
}
