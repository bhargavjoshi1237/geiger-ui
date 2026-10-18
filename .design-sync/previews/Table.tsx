import {
  Badge,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@geiger/ui";

const Frame = ({ children }) => (
  <div style={{ width: 760, border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>{children}</div>
);

const invoices = [
  { id: "INV-2041", workspace: "Geiger Events", date: "May 01, 2026", status: "Paid", amount: "$1,240.00" },
  { id: "INV-2042", workspace: "Geiger Flow", date: "May 03, 2026", status: "Pending", amount: "$480.00" },
  { id: "INV-2043", workspace: "Geiger Notes", date: "May 08, 2026", status: "Paid", amount: "$96.00" },
  { id: "INV-2044", workspace: "Geiger Forms", date: "May 12, 2026", status: "Overdue", amount: "$320.00" },
];

const statusVariant = { Paid: "success", Pending: "warning", Overdue: "danger" };

export const Invoices = () => (
  <Frame>
    <Table>
      <TableCaption style={{ paddingBottom: 12 }}>Invoices for the Acme Studio organization, May 2026.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Workspace</TableHead>
          <TableHead>Issued</TableHead>
          <TableHead>Status</TableHead>
          <TableHead style={{ textAlign: "right" }}>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((inv) => (
          <TableRow key={inv.id}>
            <TableCell style={{ fontWeight: 500 }}>{inv.id}</TableCell>
            <TableCell>{inv.workspace}</TableCell>
            <TableCell style={{ color: "var(--muted-foreground)" }}>{inv.date}</TableCell>
            <TableCell>
              <Badge variant={statusVariant[inv.status]}>{inv.status}</Badge>
            </TableCell>
            <TableCell style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{inv.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>$2,136.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  </Frame>
);

const deployments = [
  { env: "Production", branch: "main", commit: "a3f9c21", by: "Maya Chen", when: "4 min ago", status: "Ready" },
  { env: "Preview", branch: "feat/seat-maps", commit: "7be0d44", by: "Arjun Patel", when: "22 min ago", status: "Building" },
  { env: "Preview", branch: "fix/ticket-tax", commit: "c19a8e0", by: "Lena Ortiz", when: "1 hr ago", status: "Error" },
  { env: "Production", branch: "main", commit: "e02b7f3", by: "Maya Chen", when: "Yesterday", status: "Ready" },
];

const deployVariant = { Ready: "success", Building: "info", Error: "danger" };

export const Deployments = () => (
  <Frame>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Environment</TableHead>
          <TableHead>Branch</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Status</TableHead>
          <TableHead style={{ textAlign: "right" }}>Deployed</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {deployments.map((d) => (
          <TableRow key={d.commit}>
            <TableCell style={{ fontWeight: 500 }}>{d.env}</TableCell>
            <TableCell>
              <div>{d.branch}</div>
              <div style={{ fontSize: 12, color: "var(--muted-foreground)", fontFamily: "ui-monospace, monospace" }}>{d.commit}</div>
            </TableCell>
            <TableCell>{d.by}</TableCell>
            <TableCell>
              <Badge variant={deployVariant[d.status]}>{d.status}</Badge>
            </TableCell>
            <TableCell style={{ textAlign: "right", color: "var(--muted-foreground)" }}>{d.when}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Frame>
);

export const SelectedRow = () => (
  <Frame>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Member</TableHead>
          <TableHead>Role</TableHead>
          <TableHead style={{ textAlign: "right" }}>Last active</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell style={{ fontWeight: 500 }}>Maya Chen</TableCell>
          <TableCell>Owner</TableCell>
          <TableCell style={{ textAlign: "right", color: "var(--muted-foreground)" }}>Just now</TableCell>
        </TableRow>
        <TableRow data-state="selected">
          <TableCell style={{ fontWeight: 500 }}>Arjun Patel</TableCell>
          <TableCell>Admin</TableCell>
          <TableCell style={{ textAlign: "right", color: "var(--muted-foreground)" }}>2 hours ago</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ fontWeight: 500 }}>Lena Ortiz</TableCell>
          <TableCell>Member</TableCell>
          <TableCell style={{ textAlign: "right", color: "var(--muted-foreground)" }}>3 days ago</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Frame>
);
