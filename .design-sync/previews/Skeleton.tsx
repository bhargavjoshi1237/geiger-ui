import { Skeleton } from "@geiger/ui";

export const ProfileLoading = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, width: 320 }}>
    <Skeleton className="size-12 rounded-full" />
    <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  </div>
);

export const CardLoading = () => (
  <div
    style={{ display: "flex", flexDirection: "column", gap: 12, width: 320, padding: 16 }}
    className="rounded-xl border border-border bg-surface-subtle"
  >
    <Skeleton className="h-32 w-full rounded-lg" />
    <Skeleton className="h-4 w-4/5" />
    <Skeleton className="h-4 w-3/5" />
    <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
      <Skeleton className="h-8 w-20 rounded-md" />
      <Skeleton className="h-8 w-20 rounded-md" />
    </div>
  </div>
);
