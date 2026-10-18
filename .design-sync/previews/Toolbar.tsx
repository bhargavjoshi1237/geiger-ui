import { useState } from "react";
import { Button, SearchInput, Toolbar } from "@geiger/ui";
import { ChevronDown } from "lucide-react";

const Filter = ({ label }: { label: string }) => (
  <Button
    variant="outline"
    className="h-9 rounded-lg border-border bg-surface-card px-3 text-xs font-medium text-foreground hover:bg-surface-subtle"
  >
    {label} <ChevronDown className="ml-2 h-3.5 w-3.5 text-text-secondary" />
  </Button>
);

export const FiltersAndSearch = () => {
  const [search, setSearch] = useState("summit");
  return (
    <div style={{ width: 820 }}>
      <Toolbar>
        <div className="flex items-center gap-2">
          <Filter label="All Statuses" />
          <Filter label="All Types" />
        </div>
        <div style={{ width: 280 }}>
          <SearchInput expanded value={search} onChange={setSearch} placeholder="Search events, venues, cities…" />
        </div>
      </Toolbar>
    </div>
  );
};

export const CollapsedSearch = () => {
  const [search, setSearch] = useState("");
  return (
    <div style={{ width: 820 }}>
      <Toolbar>
        <div className="flex items-center gap-2">
          <Filter label="Last 30 days" />
          <Filter label="All Events" />
          <Filter label="Paid & Pending" />
        </div>
        <SearchInput value={search} onChange={setSearch} placeholder="Search orders…" />
      </Toolbar>
    </div>
  );
};
