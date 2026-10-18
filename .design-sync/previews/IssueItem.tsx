import { IssueItem } from "@geiger/ui";

const team = [
  { id: "u1", name: "Maya Chen", initials: "MC" },
  { id: "u2", name: "Arjun Patel", initials: "AP" },
  { id: "u3", name: "Lena Ortiz", initials: "LO" },
  { id: "u4", name: "Sam Rivera", initials: "SR" },
  { id: "u5", name: "Priya Shah", initials: "PS" },
];

const List = ({ children }) => (
  <div style={{ width: 720, display: "flex", flexDirection: "column", gap: 8 }}>{children}</div>
);

export const Severities = () => (
  <List>
    <IssueItem title="Checkout fails when a promo code is applied" assignee="Payments · FLOW-231" severity="critical" status="open" />
    <IssueItem title="Ticket QR codes render blurry on Android" assignee="Mobile · FLOW-224" severity="high" status="in_progress" />
    <IssueItem title="Calendar export ignores workspace time zone" assignee="Events · FLOW-219" severity="medium" status="in_progress" />
    <IssueItem title="Typo in the billing reminder email" assignee="Comms · FLOW-202" severity="low" status="resolved" />
  </List>
);

export const WithAssignees = () => (
  <List>
    <IssueItem
      title="Seat map editor drops sections on save"
      assignee="Reported by Maya Chen"
      severity="critical"
      status="open"
      assignees={team.slice(0, 2)}
      dueDate="Due May 18"
    />
    <IssueItem
      title="Webhook retries exhaust the delivery queue"
      assignee="Platform · FLOW-214"
      severity="high"
      status="in_progress"
      assignees={team}
      dueDate="Due May 21"
    />
    <IssueItem
      title="Form builder: conditional logic preview lags"
      assignee="Forms · FLOW-207"
      severity="medium"
      status="open"
      assignees={team.slice(2, 3)}
      dueDate="Due Jun 02"
    />
  </List>
);
