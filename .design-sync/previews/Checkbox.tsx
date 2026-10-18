import { Checkbox, Label } from "@geiger/ui";

const Row = ({ id, label, hint, ...props }: { id: string; label: string; hint?: string; [k: string]: any }) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
    <Checkbox id={id} style={{ marginTop: 2 }} {...props} />
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Label htmlFor={id}>{label}</Label>
      {hint ? <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{hint}</span> : null}
    </div>
  </div>
);

export const States = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14, width: 300 }}>
    <Row id="cb-checked" label="Email me about new issues" defaultChecked />
    <Row id="cb-unchecked" label="Weekly workspace digest" />
    <Row id="cb-disabled" label="Require SSO (Enterprise)" disabled />
    <Row id="cb-disabled-on" label="Workspace owner access" defaultChecked disabled />
  </div>
);

export const WithDescription = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
    <Row
      id="cb-public"
      label="Make project public"
      hint="Anyone with the link can view issues and docs."
      defaultChecked
    />
    <Row id="cb-archive" label="Archive completed tasks" hint="Tasks done for 30 days move to the archive." />
  </div>
);

export const TaskList = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 12,
      width: 300,
      padding: 16,
      border: "1px solid var(--border)",
      borderRadius: 10,
    }}
  >
    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)" }}>Launch checklist</span>
    <Row id="t1" label="Finalize pricing page copy" defaultChecked />
    <Row id="t2" label="Configure Stripe webhooks" defaultChecked />
    <Row id="t3" label="QA the onboarding flow" />
    <Row id="t4" label="Announce in #product" />
  </div>
);
