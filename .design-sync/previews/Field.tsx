import { useState } from "react";
import { Field, Input, Textarea } from "@geiger/ui";

export const WithInput = () => (
  <div style={{ width: 360 }}>
    <Field label="Event name" htmlFor="event-name">
      <Input id="event-name" defaultValue="Design Systems Summit 2026" />
    </Field>
  </div>
);

export const WithHint = () => (
  <div style={{ width: 360 }}>
    <Field label="Public URL slug" hint="Shown in the event link: events.geiger.app/acme/…" htmlFor="slug">
      <Input id="slug" defaultValue="design-systems-summit" />
    </Field>
  </div>
);

export const Stepper = () => {
  const [capacity, setCapacity] = useState("500");
  return (
    <div style={{ width: 360 }}>
      <Field
        label="Capacity"
        hint="Maximum tickets across all tiers."
        stepper
        value={capacity}
        onValueChange={setCapacity}
        step={10}
        min={0}
      >
        <Input value={capacity} onChange={(e) => setCapacity(e.target.value)} inputMode="numeric" />
      </Field>
    </div>
  );
};

export const FormGrid = () => (
  <div style={{ width: 420, display: "grid", gap: 16 }}>
    <Field label="Venue">
      <Input defaultValue="Moscone West" />
    </Field>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <Field label="City">
        <Input defaultValue="San Francisco" />
      </Field>
      <Field label="Country">
        <Input defaultValue="United States" />
      </Field>
    </div>
    <Field label="Description" hint="Supports Markdown.">
      <Textarea defaultValue="Two days of talks and workshops on building and scaling design systems." />
    </Field>
  </div>
);
