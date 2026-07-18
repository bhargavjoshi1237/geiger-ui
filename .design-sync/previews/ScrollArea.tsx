import { ScrollArea } from "@geiger/ui";

const tags = Array.from({ length: 20 }, (_, i) => `v1.2.${i} — release build`);

export const TagList = () => (
  <ScrollArea
    style={{ height: 180, width: 280 }}
    className="rounded-md border border-border bg-surface-subtle"
  >
    <div style={{ padding: 12 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 8 }}>Tags</div>
      {tags.map((t) => (
        <div
          key={t}
          style={{ fontSize: 13, color: "var(--muted-foreground)", padding: "6px 0", borderTop: "1px solid var(--border)" }}
        >
          {t}
        </div>
      ))}
    </div>
  </ScrollArea>
);
