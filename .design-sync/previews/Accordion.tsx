import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@geiger/ui";

export const FAQ = () => (
  <Accordion type="single" collapsible defaultValue="item-1" style={{ width: 420 }}>
    <AccordionItem value="item-1">
      <AccordionTrigger>What is included in the Pro plan?</AccordionTrigger>
      <AccordionContent>
        <p style={{ margin: 0, color: "var(--muted-foreground)" }}>
          Unlimited workspaces, priority support, and advanced analytics for your
          whole team.
        </p>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Can I change my plan later?</AccordionTrigger>
      <AccordionContent>
        <p style={{ margin: 0, color: "var(--muted-foreground)" }}>
          Yes, upgrade or downgrade at any time from your billing settings.
        </p>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
      <AccordionContent>
        <p style={{ margin: 0, color: "var(--muted-foreground)" }}>
          We offer a 30-day money-back guarantee on all annual subscriptions.
        </p>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

export const Multiple = () => (
  <Accordion type="multiple" defaultValue={["a", "b"]} style={{ width: 420 }}>
    <AccordionItem value="a">
      <AccordionTrigger>Shipping details</AccordionTrigger>
      <AccordionContent>
        <p style={{ margin: 0, color: "var(--muted-foreground)" }}>
          Orders ship within 2 business days via tracked courier.
        </p>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="b">
      <AccordionTrigger>Returns policy</AccordionTrigger>
      <AccordionContent>
        <p style={{ margin: 0, color: "var(--muted-foreground)" }}>
          Return any unused item within 60 days for a full refund.
        </p>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
