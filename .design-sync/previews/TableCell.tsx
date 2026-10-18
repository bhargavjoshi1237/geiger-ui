import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Progress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@geiger/ui";
import { MoreHorizontal } from "lucide-react";

const Frame = ({ children }) => (
  <div style={{ width: 760, border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>{children}</div>
);

const projects = [
  { name: "Website relaunch", owner: "Maya Chen", initials: "MC", status: "Active", progress: 72, budget: "$18,400" },
  { name: "Mobile check-in app", owner: "Arjun Patel", initials: "AP", status: "Planning", progress: 18, budget: "$9,950" },
  { name: "Billing migration", owner: "Lena Ortiz", initials: "LO", status: "At risk", progress: 46, budget: "$27,200" },
];

const statusVariant = { Active: "success", Planning: "info", "At risk": "danger" };

export const RichCells = () => (
  <Frame>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead style={{ textAlign: "right" }}>Budget</TableHead>
          <TableHead style={{ width: 56 }} />
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((p) => (
          <TableRow key={p.name}>
            <TableCell>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar style={{ width: 28, height: 28 }}>
                  <AvatarFallback style={{ fontSize: 11 }}>{p.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div style={{ fontWeight: 500 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{p.owner}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={statusVariant[p.status]}>{p.status}</Badge>
            </TableCell>
            <TableCell>
              <div style={{ display: "flex", alignItems: "center", gap: 8, width: 150 }}>
                <Progress value={p.progress} />
                <span style={{ fontSize: 12, color: "var(--muted-foreground)", width: 32 }}>{p.progress}%</span>
              </div>
            </TableCell>
            <TableCell style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{p.budget}</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" aria-label={"Actions for " + p.name}>
                <MoreHorizontal size={16} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Frame>
);

export const PlainCells = () => (
  <Frame>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Plan</TableHead>
          <TableHead>Seats</TableHead>
          <TableHead>Billing cycle</TableHead>
          <TableHead style={{ textAlign: "right" }}>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell style={{ fontWeight: 500 }}>Starter</TableCell>
          <TableCell>Up to 5</TableCell>
          <TableCell>Monthly</TableCell>
          <TableCell style={{ textAlign: "right" }}>$12 / mo</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ fontWeight: 500 }}>Team</TableCell>
          <TableCell>Up to 25</TableCell>
          <TableCell>Monthly</TableCell>
          <TableCell style={{ textAlign: "right" }}>$49 / mo</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ fontWeight: 500 }}>Enterprise</TableCell>
          <TableCell>Unlimited</TableCell>
          <TableCell>Annual</TableCell>
          <TableCell style={{ textAlign: "right" }}>Custom</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Frame>
);
