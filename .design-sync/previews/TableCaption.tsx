import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@geiger/ui";

const Frame = ({ children }) => (
  <div style={{ width: 760, border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>{children}</div>
);

const rows = [
  { name: "Summer Launch Party", date: "Jun 14, 2026", sold: "412 / 500", revenue: "$12,360" },
  { name: "Design Systems Meetup", date: "Jun 21, 2026", sold: "88 / 120", revenue: "$2,640" },
  { name: "Q3 Product Keynote", date: "Jul 02, 2026", sold: "1,204 / 1,500", revenue: "$36,120" },
];

const Rows = () => (
  <>
    <TableHeader>
      <TableRow>
        <TableHead>Event</TableHead>
        <TableHead>Date</TableHead>
        <TableHead>Tickets sold</TableHead>
        <TableHead style={{ textAlign: "right" }}>Revenue</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {rows.map((r) => (
        <TableRow key={r.name}>
          <TableCell style={{ fontWeight: 500 }}>{r.name}</TableCell>
          <TableCell style={{ color: "var(--muted-foreground)" }}>{r.date}</TableCell>
          <TableCell>{r.sold}</TableCell>
          <TableCell style={{ textAlign: "right" }}>{r.revenue}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </>
);

export const BottomCaption = () => (
  <Frame>
    <Table>
      <TableCaption style={{ paddingBottom: 12 }}>Upcoming events in the Acme Studio workspace.</TableCaption>
      <Rows />
    </Table>
  </Frame>
);

export const TopCaption = () => (
  <Frame>
    <Table>
      <TableCaption style={{ captionSide: "top", marginTop: 0, padding: "12px 24px", textAlign: "left" }}>
        Showing 3 of 18 events, sorted by date
      </TableCaption>
      <Rows />
    </Table>
  </Frame>
);
