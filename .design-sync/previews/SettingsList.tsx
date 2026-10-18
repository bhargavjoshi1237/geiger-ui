import { useState } from "react";
import { Button, SectionCard, SettingRow, SettingsList } from "@geiger/ui";
import { Bell, Globe, Mail, Ticket, Users } from "lucide-react";

export const InSectionCard = () => {
  const [state, setState] = useState({ email: true, waitlist: true, publicPage: false });
  const toggle = (k: keyof typeof state) => (v: boolean) => setState((s) => ({ ...s, [k]: v }));
  return (
    <div style={{ width: 640 }}>
      <SectionCard title="Notifications" description="Choose what Acme Conferences sends to attendees.">
        <SettingsList>
          <SettingRow
            icon={Mail}
            title="Order confirmations"
            description="Email a receipt and ticket PDF after every purchase."
            checked={state.email}
            onCheckedChange={toggle("email")}
          />
          <SettingRow
            icon={Users}
            title="Waitlist alerts"
            description="Notify waitlisted guests when seats free up."
            checked={state.waitlist}
            onCheckedChange={toggle("waitlist")}
          />
          <SettingRow
            icon={Globe}
            title="Public attendee list"
            description="Show registered attendees on the event page."
            checked={state.publicPage}
            onCheckedChange={toggle("publicPage")}
          />
        </SettingsList>
      </SectionCard>
    </div>
  );
};

export const MixedControls = () => {
  const [reminders, setReminders] = useState(true);
  return (
    <div style={{ width: 640 }}>
      <SettingsList>
        <SettingRow
          icon={Bell}
          title="Event reminders"
          description="Send a reminder 24 hours before doors open."
          checked={reminders}
          onCheckedChange={setReminders}
        />
        <SettingRow
          icon={Ticket}
          title="Ticket transfers"
          description="Let buyers reassign tickets to another guest."
          control={<Button size="sm" variant="outline">Configure</Button>}
        />
        <SettingRow
          title="Data export"
          description="Download all orders and attendees as CSV."
          control={<Button size="sm" variant="outline">Export</Button>}
        />
      </SettingsList>
    </div>
  );
};
