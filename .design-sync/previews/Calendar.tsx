import { Calendar } from "@geiger/ui";

// Calendar always jumps to today on mount, so events are placed relative to the current date.
const at = (dayOffset: number, hour: number, minute = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
};

const TIMED = [
  { id: "e1", title: "Team standup", type: "meeting", day: 0, from: 9, to: 9.5 },
  { id: "e2", title: "Sprint planning", type: "planning", day: 0, from: 11, to: 12 },
  { id: "e3", title: "Ship billing v2", type: "deadline", day: 1, from: 12, to: 13 },
  { id: "e4", title: "Design review", type: "design", day: 2, from: 10, to: 11 },
  { id: "e5", title: "Q4 launch", type: "milestone", day: 3, from: 9, to: 10 },
  { id: "e6", title: "Fix SSO redirect", type: "task", day: -2, from: 13, to: 14 },
  { id: "e7", title: "Renew domain", type: "reminder", day: -1, from: 9, to: 9.5 },
  { id: "e8", title: "Customer call", type: "meeting", day: -3, from: 10, to: 11 },
  { id: "e9", title: "Retro", type: "meeting", day: 0, from: 13, to: 14 },
];

const toEvent = (e: (typeof TIMED)[number]) => ({
  id: e.id,
  title: e.title,
  type: e.type,
  start: at(e.day, Math.floor(e.from), (e.from % 1) * 60),
  end: at(e.day, Math.floor(e.to), (e.to % 1) * 60),
});

// Month cells match events against local midnight, so month-view events open at 00:00.
const MONTH_EVENTS = [
  ...TIMED.map((e) => ({ ...toEvent(e), start: at(e.day, 0) })),
  { id: "m1", title: "Board meeting", type: "meeting", start: at(7, 0), end: at(7, 15) },
  { id: "m2", title: "Invoice run", type: "task", start: at(9, 0), end: at(9, 12) },
  { id: "m3", title: "Design summit", type: "milestone", start: at(-8, 0), end: at(-8, 17) },
];

const WEEK_EVENTS = TIMED.map(toEvent);

// Scaled to fit the 900x700 capture frame; the month grid's 120px rows overflow it at 1:1.
export const Month = () => (
  <div style={{ width: 1000, zoom: 0.76 }}>
    <Calendar events={MONTH_EVENTS} view="month" />
  </div>
);

export const Week = () => (
  <div style={{ width: 840 }}>
    <Calendar events={WEEK_EVENTS} view="week" minHour={8} maxHour={14} />
  </div>
);
