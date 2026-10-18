import { Timeline } from "@geiger/ui";

// Dates are built relative to "today" so the today-highlight always lands inside the window.
const at = (dayOffset, hour, durationHours = 1) => {
  const start = new Date();
  start.setDate(start.getDate() + dayOffset);
  start.setHours(hour, 0, 0, 0);
  const end = new Date(start);
  end.setHours(start.getHours() + durationHours);
  return { start, end };
};

const startOfWindow = () => {
  const d = new Date();
  d.setDate(d.getDate() - 2);
  return d;
};

const sprintEvents = [
  { title: "Sprint planning", type: "planning", ...at(-2, 10) },
  { title: "Daily standup", type: "standup", ...at(-1, 9) },
  { title: "Seat map review", type: "design", ...at(-1, 14) },
  { title: "Daily standup", type: "standup", ...at(0, 9) },
  { title: "Launch campaign sync", type: "marketing", ...at(0, 13) },
  { title: "Ship ticket tax fix", type: "task", ...at(0, 16) },
  { title: "Design critique", type: "design", ...at(1, 11) },
  { title: "Venue walkthrough", type: "inspection", ...at(2, 10) },
  { title: "Customer call: Acme", type: "meeting", ...at(3, 15) },
  { title: "Daily standup", type: "standup", ...at(4, 9) },
  { title: "Team lunch", type: "lunch", ...at(4, 12) },
  { title: "Release v2.4", type: "task", ...at(6, 17) },
  { title: "Retro", type: "meeting", ...at(8, 16) },
  { title: "Q3 keynote rehearsal", type: "work", ...at(10, 10) },
];

export const SprintSchedule = () => (
  <div style={{ width: 860 }}>
    <Timeline events={sprintEvents} startDate={startOfWindow()} />
  </div>
);

export const WithCreate = () => (
  <div style={{ width: 860 }}>
    <Timeline
      events={sprintEvents.slice(0, 7)}
      startDate={startOfWindow()}
      enableCreate
    />
  </div>
);
