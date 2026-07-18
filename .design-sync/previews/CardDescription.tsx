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
      <CardTitle>Reset password</CardTitle>
      <CardDescription>
        We&apos;ll email you a secure link to set a new password.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: 0 }}>
        The link expires 30 minutes after it is sent.
      </p>
    </CardContent>
    <CardFooter style={{ display: "flex", gap: 8 }}>
      <Button size="sm">Send link</Button>
    </CardFooter>
  </Card>
);

export const LongDescription = () => (
  <Card style={{ width: 360 }}>
    <CardHeader>
      <CardTitle>Data export</CardTitle>
      <CardDescription>
        Exporting may take a few minutes. You&apos;ll receive a download link by
        email once your archive is ready.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: 0 }}>
        Includes all projects, comments, and attachments.
      </p>
    </CardContent>
    <CardFooter style={{ display: "flex", gap: 8 }}>
      <Button size="sm">Start export</Button>
    </CardFooter>
  </Card>
);
