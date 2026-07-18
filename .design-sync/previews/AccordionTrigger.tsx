import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@geiger/ui";

export const Triggers = () => (
  <Accordion type="single" collapsible defaultValue="item-1" style={{ width: 420 }}>
    <AccordionItem value="item-1">
      <AccordionTrigger>How do I reset my password?</AccordionTrigger>
      <AccordionContent>
        <p style={{ margin: 0, color: "var(--muted-foreground)" }}>
          Use the &quot;Forgot password&quot; link on the sign-in screen to
          receive a reset email.
        </p>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Where can I download invoices?</AccordionTrigger>
      <AccordionContent>
        <p style={{ margin: 0, color: "var(--muted-foreground)" }}>
          All invoices are available under Billing → History.
        </p>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger disabled>Enterprise SSO (coming soon)</AccordionTrigger>
      <AccordionContent>
        <p style={{ margin: 0, color: "var(--muted-foreground)" }}>
          SAML single sign-on is on the roadmap for Q4.
        </p>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
