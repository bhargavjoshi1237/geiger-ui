import * as React from "react";
import { SuiteHeader, Avatar, AvatarFallback, Button } from "@geiger/ui";
import { ArrowRight } from "lucide-react";

const LOGO_SRC = "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20467%20285%22%3E%3Cpath%20d%3D%22M427.054%201.17427C431.046%201.15338%20464.984%200.670938%20466.079%201.40804C466.298%204.01125%20464.421%203.92073%20463.267%206.18971C450.436%2031.3381%20435.978%2055.3181%20422.003%2079.8289L339.669%20223C327.843%20243.287%20317.065%20263.871%20304.413%20283.952L285.161%20283.494C273.521%20283.311%20254.97%20282.561%20244.096%20284C255.18%20269.451%20265.622%20246.845%20275.646%20231.004C280.056%20224.033%20284.971%20216.613%20289.146%20209.596C302.879%20186.047%20316.389%20162.368%20329.675%20138.564C346.203%20109.513%20363.065%2080.653%20380.256%2051.9898C390.11%2035.4483%20398.71%2017.3651%20409.366%201.55774C415.08%201.29513%20421.301%201.29165%20427.054%201.17427Z%22%20fill%3D%22%2318181b%22%2F%3E%3Cpath%20d%3D%22M218.309%201.31216L224%201.15608L193.641%2050.3271L170.178%2091.0997L136.561%20149.51L124.008%20172.428L103.37%20206.726L77.2097%20251.035L57.3197%20283.677L6.18221%20283.433L0%20284.156L22.4687%20244.331L54.6016%20189.816L75.3213%20152.467L94.3273%20119.376L144.096%2031L161%201.15608L218.309%201.31216Z%22%20fill%3D%22%2318181b%22%2F%3E%3Cpath%20d%3D%22M344.758%200L345.096%200.735049C326.643%2033.9528%20307.753%2066.9251%20288.428%2099.6433C284.236%20106.683%20278.484%20114.061%20274.613%20121.064C265.581%20137.399%20256.332%20153.496%20247.097%20169.697L208.592%20236.882C199.377%20253.009%20192.444%20267.92%20180.666%20282.525C163.285%20284.093%20142.445%20282.6%20123.432%20284L123.098%20283.728C123.005%20282.163%20127.788%20276.233%20129.062%20273.917C135.826%20261.605%20142.61%20249.297%20149.637%20237.134L240.526%2079.7429C249.025%2064.9272%20257.723%2050.1984%20266.187%2035.3414C268.992%2030.4177%20277.596%2015%20285.096%200.735052C305.596%200.735046%20325.596%200.735049%20344.131%200.1168L344.758%200Z%22%20fill%3D%22%2318181b%22%2F%3E%3C%2Fsvg%3E";

// SuiteHeader is position:fixed; a transformed frame contains it like a page viewport.
const Page = ({ children, headline }: { children: React.ReactNode; headline: string }) => (
  <div
    style={{
      position: "relative",
      transform: "translateZ(0)",
      height: 300,
      width: "100%",
      overflow: "hidden",
      background: "var(--background)",
    }}
  >
    {children}
    <div
      style={{
        display: "grid",
        justifyItems: "center",
        gap: 14,
        paddingTop: 108,
        textAlign: "center",
      }}
    >
      <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.8, color: "var(--foreground)" }}>
        {headline}
      </span>
      <span style={{ fontSize: 15, color: "var(--muted-foreground)", maxWidth: 460 }}>
        One suite for notes, flow, events and forms — built to manage, designed to create.
      </span>
      <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
        <Button>
          Get started <ArrowRight />
        </Button>
        <Button variant="outline">View pricing</Button>
      </div>
    </div>
  </div>
);

export const SignedOut = () => (
  <Page headline="Built to Manage. Designed to Create.">
    <SuiteHeader logoSrc={LOGO_SRC} />
  </Page>
);

export const SignedInWithProfile = () => (
  <Page headline="Welcome back to Geiger Studios">
    <SuiteHeader
      userId="usr_8f21"
      logoSrc={LOGO_SRC}
      profile={
        <Avatar size="sm">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      }
    />
  </Page>
);

export const MinimalNoMegaMenu = () => (
  <Page headline="Geiger Events">
    <SuiteHeader label="Geiger Events" megaMenu={false} themeToggle={false} logoSrc={LOGO_SRC} />
  </Page>
);
