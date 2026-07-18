import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@geiger/ui";

export const Items = () => (
  <Accordion type="single" collapsible defaultValue="item-1" style={{ width: 420 }}>
    <AccordionItem value="item-1">
      <AccordionTrigger>Account settings</AccordionTrigger>
      <AccordionContent>
        <p style={{ margin: 0, color: "var(--muted-foreground)" }}>
          Update your name, email, and password from the profile page.
        </p>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Notifications</AccordionTrigger>
      <AccordionContent>
        <p style={{ margin: 0, color: "var(--muted-foreground)" }}>
          Choose which events send you email or in-app alerts.
        </p>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>Integrations</AccordionTrigger>
      <AccordionContent>
        <p style={{ margin: 0, color: "var(--muted-foreground)" }}>
          Connect Slack, GitHub, and Linear to sync your workflow.
        </p>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
