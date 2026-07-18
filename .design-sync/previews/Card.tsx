import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@geiger/ui";

export const Basic = () => (
  <Card style={{ width: 360 }}>
    <CardHeader>
      <CardTitle>Monthly report</CardTitle>
      <CardDescription>Your team&apos;s activity for June 2026.</CardDescription>
    </CardHeader>
    <CardContent>
      <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: 0 }}>
        1,284 events processed across 6 workspaces, up 12% from last month.
      </p>
    </CardContent>
    <CardFooter style={{ display: "flex", gap: 8 }}>
      <Button size="sm">View report</Button>
      <Button size="sm" variant="ghost">
        Dismiss
      </Button>
    </CardFooter>
  </Card>
);

export const WithAction = () => (
  <Card style={{ width: 360 }}>
    <CardHeader>
      <CardTitle>Billing</CardTitle>
      <CardDescription>Manage your subscription and invoices.</CardDescription>
      <CardAction>
        <Button size="sm" variant="outline">
          Upgrade
        </Button>
      </CardAction>
    </CardHeader>
    <CardContent>
      <div style={{ fontSize: 28, fontWeight: 600 }}>
        $49
        <span style={{ fontSize: 14, color: "var(--muted-foreground)", fontWeight: 400 }}>
          /mo
        </span>
      </div>
    </CardContent>
  </Card>
);
