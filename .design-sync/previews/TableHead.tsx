import { Checkbox, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@geiger/ui";
import { ArrowDown, ArrowUpDown } from "lucide-react";

const Frame = ({ children }) => (
  <div style={{ width: 760, border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>{children}</div>
);

const issues = [
  { key: "FLOW-214", title: "Webhook retries exhaust the queue", assignee: "Maya Chen", priority: "High", updated: "12 min ago" },
  { key: "FLOW-209", title: "Board view loses scroll position", assignee: "Arjun Patel", priority: "Medium", updated: "1 hr ago" },
  { key: "FLOW-198", title: "Export CSV omits custom fields", assignee: "Lena Ortiz", priority: "Low", updated: "Yesterday" },
];

export const Headers = () => (
  <Frame>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Key</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Assignee</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead style={{ textAlign: "right" }}>Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {issues.map((i) => (
          <TableRow key={i.key}>
            <TableCell style={{ color: "var(--muted-foreground)" }}>{i.key}</TableCell>
            <TableCell style={{ fontWeight: 500 }}>{i.title}</TableCell>
            <TableCell>{i.assignee}</TableCell>
            <TableCell>{i.priority}</TableCell>
            <TableCell style={{ textAlign: "right", color: "var(--muted-foreground)" }}>{i.updated}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Frame>
);

export const SortableWithCheckbox = () => (
  <Frame>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead style={{ width: 48 }}>
            <Checkbox aria-label="Select all" checked="indeterminate" />
          </TableHead>
          <TableHead>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              Title <ArrowUpDown size={12} />
            </span>
          </TableHead>
          <TableHead>Assignee</TableHead>
          <TableHead style={{ textAlign: "right" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--foreground)" }}>
              Updated <ArrowDown size={12} />
            </span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {issues.map((i, n) => (
          <TableRow key={i.key} data-state={n === 0 ? "selected" : undefined}>
            <TableCell>
              <Checkbox aria-label={"Select " + i.key} checked={n === 0} />
            </TableCell>
            <TableCell style={{ fontWeight: 500 }}>{i.title}</TableCell>
            <TableCell>{i.assignee}</TableCell>
            <TableCell style={{ textAlign: "right", color: "var(--muted-foreground)" }}>{i.updated}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Frame>
);
