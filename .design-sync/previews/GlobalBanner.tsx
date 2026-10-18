import { BannerProvider, GlobalBanner } from "@geiger/ui";

const AppTop = ({ product }: { product: string }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      height: 48,
      padding: "0 16px",
      borderBottom: "1px solid var(--border)",
      fontSize: 13,
      fontWeight: 600,
      color: "var(--foreground)",
      background: "var(--background)",
    }}
  >
    {product}
  </div>
);

export const MaintenanceWarning = () => (
  <BannerProvider
    position="static"
    initial={{
      message: "Scheduled maintenance Sunday 02:00–03:00 UTC — editing will be paused.",
      type: "warning",
      dismissible: true,
      link: { text: "Status page", href: "https://status.geiger.studio", external: true },
    }}
  >
    <div style={{ width: "100%" }}>
      <GlobalBanner />
      <AppTop product="Geiger Events" />
    </div>
  </BannerProvider>
);

export const TrialInfo = () => (
  <BannerProvider
    position="static"
    initial={{
      message: "Your Pro trial ends in 5 days.",
      type: "info",
      link: { text: "Choose a plan", href: "/pricing" },
    }}
  >
    <div style={{ width: "100%" }}>
      <GlobalBanner />
      <AppTop product="Geiger Flow" />
    </div>
  </BannerProvider>
);

export const IncidentNotice = () => (
  <BannerProvider
    position="static"
    initial={{
      message: "Degraded email delivery — campaign sends may be delayed.",
      type: "warning",
    }}
  >
    <div style={{ width: "100%" }}>
      <GlobalBanner />
      <AppTop product="Geiger Campaign" />
    </div>
  </BannerProvider>
);
