import { ActivityCalendar } from "@geiger/ui";

const TITLES = ["Issue resolved", "Doc edited", "Form submitted", "Event published", "Deploy shipped", "Comment added"];
const TYPES = ["task", "work", "meeting", "planning", "design", "task"];

// Deterministic workspace activity for the last ~6 weeks, relative to today.
const buildActivities = () => {
  const out = [];
  for (let day = 0; day < 42; day++) {
    const weekday = (day * 3 + 5) % 7;
    const base = weekday === 0 || weekday === 6 ? 1 : 2 + ((day * 7) % 5);
    for (let i = 0; i < base; i++) {
      const ts = new Date();
      ts.setDate(ts.getDate() - day);
      ts.setHours(9 + ((day + i * 3) % 9), (i * 17) % 60, 0, 0);
      out.push({
        timestamp: ts.toISOString(),
        intensity: 1 + ((day + i) % 4),
        title: TITLES[(day + i) % TITLES.length],
        type: TYPES[(day + i) % TYPES.length],
      });
    }
  }
  return out;
};

const activities = buildActivities();

export const WorkspaceActivity = () => (
  <div style={{ width: 860 }}>
    <ActivityCalendar
      activities={activities}
      title="Workspace activity"
      description="Issues, docs and deploys across Acme Studio"
    />
  </div>
);

export const WithoutStats = () => (
  <div style={{ width: 860 }}>
    <ActivityCalendar activities={activities} showStats={false} />
  </div>
);
