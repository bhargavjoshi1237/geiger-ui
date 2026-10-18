import * as React from "react";
import { DatePicker, Button, Popover, PopoverTrigger, PopoverContent } from "@geiger/ui";
import { Calendar as CalendarIcon } from "lucide-react";

export const InPopover = () => {
  const [selected, setSelected] = React.useState<Date | undefined>(new Date(2026, 10, 14));
  return (
    <div style={{ width: 280 }}>
      <Popover open>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start font-normal">
            <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            {selected
              ? selected.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
              : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" onOpenAutoFocus={(e: Event) => e.preventDefault()}>
          <DatePicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            defaultMonth={new Date(2026, 10, 1)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export const Inline = () => {
  const [selected, setSelected] = React.useState<Date | undefined>(new Date(2026, 10, 14));
  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: 10, display: "inline-block" }}>
      <DatePicker mode="single" selected={selected} onSelect={setSelected} defaultMonth={new Date(2026, 10, 1)} />
    </div>
  );
};
