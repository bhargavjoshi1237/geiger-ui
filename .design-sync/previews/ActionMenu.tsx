import { ActionMenu } from "@geiger/ui";
import { Pencil, Copy, ExternalLink, Trash2, RefreshCw, Archive } from "lucide-react";

const row = {
  width: 340,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  padding: "8px 12px",
  borderRadius: 8,
  border: "1px solid var(--border)",
  fontSize: 14,
} as const;

export const IssueRow = () => (
  <div style={{ ...row, marginLeft: 0 }}>
    <span>Fix invoice rounding on annual plans</span>
    <ActionMenu
      defaultOpen
      label="Actions for issue"
      items={[
        { icon: Pencil, label: "Edit" },
        { icon: Copy, label: "Duplicate" },
        { icon: ExternalLink, label: "Open in new tab", href: "https://geiger.app/i/482" },
        { separator: true },
        { icon: Trash2, label: "Delete", destructive: true },
      ]}
    />
  </div>
);

export const DisabledAndSpinning = () => (
  <div style={row}>
    <span>events.acme.com</span>
    <ActionMenu
      defaultOpen
      label="Actions for domain"
      items={[
        { icon: RefreshCw, label: "Verifying…", spin: true, disabled: true },
        { icon: Archive, label: "Archive", disabled: true },
        { separator: true },
        { icon: Trash2, label: "Remove domain", destructive: true },
      ]}
    />
  </div>
);

export const ClosedTrigger = () => (
  <div style={{ display: "grid", gap: 8 }}>
    {["Summer Summit 2026", "Platform roadmap", "Research notes"].map((name) => (
      <div key={name} style={row}>
        <span>{name}</span>
        <ActionMenu
          label={`Actions for ${name}`}
          items={[
            { icon: Pencil, label: "Rename" },
            { icon: Trash2, label: "Delete", destructive: true },
          ]}
        />
      </div>
    ))}
  </div>
);
