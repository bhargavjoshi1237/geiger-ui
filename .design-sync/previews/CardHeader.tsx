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
      <CardTitle>Weekly digest</CardTitle>
      <CardDescription>A summary of what changed this week.</CardDescription>
    </CardHeader>
    <CardContent>
      <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: 0 }}>
        42 pull requests merged and 3 releases shipped.
      </p>
    </CardContent>
    <CardFooter style={{ display: "flex", gap: 8 }}>
      <Button size="sm">Open digest</Button>
    </CardFooter>
  </Card>
);

export const TitleOnly = () => (
  <Card style={{ width: 360 }}>
    <CardHeader>
      <CardTitle>Team members</CardTitle>
    </CardHeader>
    <CardContent>
      <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: 0 }}>
        8 people have access to this workspace.
      </p>
    </CardContent>
    <CardFooter style={{ display: "flex", gap: 8 }}>
      <Button size="sm" variant="outline">
        Invite
      </Button>
    </CardFooter>
  </Card>
);
