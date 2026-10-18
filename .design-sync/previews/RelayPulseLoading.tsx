import { RelayPulseLoading } from "@geiger/ui";

// Freezes the loop at fixed offsets so the card shows the motion deterministically.
const FRAMES = [0.3, 0.9, 1.5, 2.1, 2.7, 3.3];
const freezeCss = FRAMES.map(
  (t, i) =>
    `.gl-frame-${i} .geiger-loading, .gl-frame-${i} .geiger-loading * { animation-play-state: paused !important; animation-delay: -${t}s !important; }`,
).join("\n");

const Strip = ({ size }: { size: number }) => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: 22 }}>
    <style>{freezeCss}</style>
    {FRAMES.map((t, i) => (
      <div key={t} className={`gl-frame-${i}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <RelayPulseLoading size={size} />
        <span style={{ fontSize: 11, color: "var(--muted-foreground)" }}>{t}s</span>
      </div>
    ))}
  </div>
);

export const Frames = () => (
  <div style={{ padding: 16 }}>
    <Strip size={56} />
  </div>
);

export const OnDarkCanvas = () => (
  <div className="dark" style={{ padding: 24, borderRadius: 12, background: "var(--background)", color: "var(--foreground)", display: "inline-block" }}>
    <Strip size={56} />
  </div>
);
