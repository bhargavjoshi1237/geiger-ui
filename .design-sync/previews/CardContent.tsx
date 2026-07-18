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
      <CardTitle>Invoice #2048</CardTitle>
      <CardDescription>Due July 31, 2026.</CardDescription>
    </CardHeader>
    <CardContent>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
        <span style={{ color: "var(--muted-foreground)" }}>Amount due</span>
        <span style={{ fontWeight: 600 }}>$1,240.00</span>
      </div>
    </CardContent>
    <CardFooter style={{ display: "flex", gap: 8 }}>
      <Button size="sm">Pay now</Button>
    </CardFooter>
  </Card>
);

export const RichContent = () => (
  <Card style={{ width: 360 }}>
    <CardHeader>
      <CardTitle>Deployment</CardTitle>
      <CardDescription>Production build completed.</CardDescription>
    </CardHeader>
    <CardContent>
      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, color: "var(--muted-foreground)", display: "flex", flexDirection: "column", gap: 4 }}>
        <li>Bundle size 312 KB</li>
        <li>Build time 48s</li>
        <li>Region iad1</li>
      </ul>
    </CardContent>
    <CardFooter style={{ display: "flex", gap: 8 }}>
      <Button size="sm" variant="outline">
        View logs
      </Button>
    </CardFooter>
  </Card>
);
