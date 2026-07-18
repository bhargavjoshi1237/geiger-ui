import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@geiger/ui";

export const InCard = () => (
  <Card style={{ width: 360 }}>
    <CardHeader>
      <CardTitle>Storage usage</CardTitle>
      <CardDescription>You are using 68% of your plan.</CardDescription>
    </CardHeader>
    <CardContent>
      <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: 0 }}>
        34 GB of 50 GB used across all projects.
      </p>
    </CardContent>
    <CardFooter style={{ display: "flex", gap: 8 }}>
      <Button size="sm">Manage storage</Button>
    </CardFooter>
  </Card>
);

export const Prominent = () => (
  <Card style={{ width: 360 }}>
    <CardHeader>
      <CardTitle style={{ fontSize: 20 }}>Pro plan</CardTitle>
      <CardDescription>Everything you need to scale your team.</CardDescription>
    </CardHeader>
    <CardContent>
      <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: 0 }}>
        Unlimited projects, priority support, and advanced analytics.
      </p>
    </CardContent>
    <CardFooter style={{ display: "flex", gap: 8 }}>
      <Button size="sm">Choose plan</Button>
    </CardFooter>
  </Card>
);
