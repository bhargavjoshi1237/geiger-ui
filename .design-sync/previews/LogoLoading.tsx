import { useEffect, useRef } from "react";
import { LogoLoading } from "@geiger/ui";

// Seconds into each treatment's loop where the mark reads clearly (all bars lit).
const FRAME = {
  "neon-start": 1.92,
  burst: 0.01,
  "dying-bulb": 0.8,
  "elastic-pop": 1.2,
  "relay-pulse": 0.66,
  "short-circuit": 1.5,
};

// Seeks every loader inside the cell to a legible frame, holds it briefly, then lets the loops run.
function useLegibleFrame() {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || !root.getAnimations) return;
    const anims = root.getAnimations({ subtree: true });
    for (const a of anims) {
      const target = a.effect && a.effect.target;
      const host = target && target.closest ? target.closest("[data-variant]") : null;
      const t = FRAME[host ? host.getAttribute("data-variant") : ""] ?? 0;
      a.pause();
      a.currentTime = t * 1000;
    }
    const id = setTimeout(() => anims.forEach((a) => a.play()), 4000);
    return () => clearTimeout(id);
  }, []);
  return ref;
}

const GALLERY = [
  "Neon start",
  "Arc flicker",
  "Sequential strobe",
  "Static crackle",
  "Elastic pop",
  "Relay pulse",
  "Warning flash",
  "Fuse relay",
  "Short circuit",
  "Dying bulb",
];

export const NamedVariants = () => {
  const ref = useLegibleFrame();
  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(5, 120px)", gap: 12 }}>
      {GALLERY.map((name) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            padding: "18px 8px 12px",
            border: "1px solid var(--border)",
            borderRadius: 12,
            color: "var(--foreground)",
          }}
        >
          <div style={{ height: 40, display: "flex", alignItems: "center" }}>
            <LogoLoading name={name} size={56} />
          </div>
          <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{name}</span>
        </div>
      ))}
    </div>
  );
};

export const Sizes = () => {
  const ref = useLegibleFrame();
  return (
    <div ref={ref} style={{ display: "flex", alignItems: "flex-end", gap: 32, color: "var(--foreground)" }}>
      {[
        { size: 32, label: "32 · compact panel" },
        { size: 48, label: "48 · section card" },
        { size: 88, label: "88 · full page" },
      ].map(({ size, label }) => (
        <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <LogoLoading name="Arc flicker" size={size} />
          <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{label}</span>
        </div>
      ))}
    </div>
  );
};

export const SectionLoader = () => {
  const ref = useLegibleFrame();
  return (
    <div
      ref={ref}
      style={{
        width: 420,
        height: 220,
        border: "1px solid var(--border)",
        borderRadius: 16,
        background: "var(--surface-subtle)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        color: "var(--foreground)",
      }}
    >
      <LogoLoading name="Neon start" size={52} />
      <span style={{ fontSize: 13, color: "var(--muted-foreground)" }}>Loading workspace activity…</span>
    </div>
  );
};

export const AccentColor = () => {
  const ref = useLegibleFrame();
  return (
    <div ref={ref} style={{ display: "flex", gap: 16 }}>
      {[
        { name: "Sequential strobe", accent: "#3b82f6" },
        { name: "Neon start", accent: "#10b981" },
      ].map(({ name, accent }) => (
        <div
          key={name}
          style={{
            width: 200,
            height: 130,
            borderRadius: 12,
            background: "#161616",
            color: "#e7e7e7",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <LogoLoading name={name} size={64} accent={accent} />
          <span style={{ fontSize: 12, opacity: 0.7 }}>{name} · accent {accent}</span>
        </div>
      ))}
    </div>
  );
};
