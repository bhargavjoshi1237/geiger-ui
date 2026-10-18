import { useState } from "react";
import { Badge, Button, SettingRow, SettingsList } from "@geiger/ui";
import { Lock, Mail, ShieldCheck } from "lucide-react";

export const SwitchOn = () => {
  const [on, setOn] = useState(true);
  return (
    <div style={{ width: 560 }}>
      <SettingsList>
        <SettingRow
          icon={Mail}
          title="Order confirmations"
          description="Email a receipt and ticket PDF after every purchase."
          checked={on}
          onCheckedChange={setOn}
        />
      </SettingsList>
    </div>
  );
};

export const SwitchOff = () => {
  const [on, setOn] = useState(false);
  return (
    <div style={{ width: 560 }}>
      <SettingsList>
        <SettingRow
          icon={Lock}
          title="Password-protected page"
          description="Require an access code before guests can view the event."
          checked={on}
          onCheckedChange={setOn}
        />
      </SettingsList>
    </div>
  );
};

export const CustomControl = () => (
  <div style={{ width: 560 }}>
    <SettingsList>
      <SettingRow
        icon={ShieldCheck}
        title="Two-factor authentication"
        description="Protect workspace admins with an authenticator app."
        control={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Badge variant="success">Enabled</Badge>
            <Button size="sm" variant="outline">Manage</Button>
          </div>
        }
      />
    </SettingsList>
  </div>
);

export const NoIcon = () => {
  const [on, setOn] = useState(true);
  return (
    <div style={{ width: 560 }}>
      <SettingsList>
        <SettingRow
          title="Show remaining tickets"
          description="Display a live count on the ticket selector."
          checked={on}
          onCheckedChange={setOn}
        />
      </SettingsList>
    </div>
  );
};
