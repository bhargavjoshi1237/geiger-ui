import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@geiger/ui";

export const Content = () => (
  <Accordion type="single" collapsible defaultValue="item-1" style={{ width: 420 }}>
    <AccordionItem value="item-1">
      <AccordionTrigger>What data do you collect?</AccordionTrigger>
      <AccordionContent>
        <p style={{ margin: "0 0 8px", color: "var(--muted-foreground)" }}>
          We collect only what is needed to run your account:
        </p>
        <ul style={{ margin: 0, paddingLeft: 18, color: "var(--muted-foreground)" }}>
          <li>Email and profile name</li>
          <li>Workspace activity for analytics</li>
          <li>Billing details via Stripe</li>
        </ul>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Is my data encrypted?</AccordionTrigger>
      <AccordionContent>
        <p style={{ margin: 0, color: "var(--muted-foreground)" }}>
          Yes, all data is encrypted in transit and at rest using AES-256.
        </p>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
