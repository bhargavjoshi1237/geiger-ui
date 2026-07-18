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

export const InCard = () => (
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
    <CardFooter style={{ display: "flex", gap: 8 }}>
      <Button size="sm" variant="ghost">
        View invoices
      </Button>
    </CardFooter>
  </Card>
);

export const LinkAction = () => (
  <Card style={{ width: 360 }}>
    <CardHeader>
      <CardTitle>Notifications</CardTitle>
      <CardDescription>You have 3 unread alerts.</CardDescription>
      <CardAction>
        <Button size="sm" variant="ghost">
          Mark all read
        </Button>
      </CardAction>
    </CardHeader>
    <CardContent>
      <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: 0 }}>
        Latest: deploy to production succeeded 5 minutes ago.
      </p>
    </CardContent>
    <CardFooter style={{ display: "flex", gap: 8 }}>
      <Button size="sm" variant="outline">
        Settings
      </Button>
    </CardFooter>
  </Card>
);
