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
      <CardTitle>Delete project</CardTitle>
      <CardDescription>This action cannot be undone.</CardDescription>
    </CardHeader>
    <CardContent>
      <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: 0 }}>
        All tasks, files, and history will be permanently removed.
      </p>
    </CardContent>
    <CardFooter style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
      <Button size="sm" variant="ghost">
        Cancel
      </Button>
      <Button size="sm" variant="destructive">
        Delete
      </Button>
    </CardFooter>
  </Card>
);

export const SingleAction = () => (
  <Card style={{ width: 360 }}>
    <CardHeader>
      <CardTitle>Newsletter</CardTitle>
      <CardDescription>Get product updates every month.</CardDescription>
    </CardHeader>
    <CardContent>
      <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: 0 }}>
        Join 12,000 subscribers. Unsubscribe anytime.
      </p>
    </CardContent>
    <CardFooter>
      <Button size="sm" style={{ width: "100%" }}>
        Subscribe
      </Button>
    </CardFooter>
  </Card>
);
