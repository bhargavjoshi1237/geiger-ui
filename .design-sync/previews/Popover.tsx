import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  Button,
  Input,
  Label,
} from "@geiger/ui";
import { Share2, CalendarDays } from "lucide-react";

export const ShareProject = () => (
  <Popover defaultOpen>
    <PopoverTrigger asChild>
      <Button variant="outline">
        <Share2 />
        Share
      </Button>
    </PopoverTrigger>
    <PopoverContent align="start" onOpenAutoFocus={(e) => e.preventDefault()}>
      <div style={{ display: "grid", gap: 12 }}>
        <PopoverHeader>
          <PopoverTitle>Share project</PopoverTitle>
          <PopoverDescription>
            Anyone with the link can view Platform roadmap.
          </PopoverDescription>
        </PopoverHeader>
        <div style={{ display: "flex", gap: 8 }}>
          <Input readOnly defaultValue="geiger.app/p/roadmap" />
          <Button size="sm">Copy</Button>
        </div>
      </div>
    </PopoverContent>
  </Popover>
);

export const EventDates = () => (
  <Popover defaultOpen>
    <PopoverTrigger asChild>
      <Button variant="outline">
        <CalendarDays />
        Event dates
      </Button>
    </PopoverTrigger>
    <PopoverContent align="start" onOpenAutoFocus={(e) => e.preventDefault()}>
      <div style={{ display: "grid", gap: 12 }}>
        <PopoverHeader>
          <PopoverTitle>Summer Summit 2026</PopoverTitle>
          <PopoverDescription>Set when doors open and close.</PopoverDescription>
        </PopoverHeader>
        <div style={{ display: "grid", gap: 6 }}>
          <Label htmlFor="p-start">Starts</Label>
          <Input id="p-start" defaultValue="Jul 14, 2026 · 09:00" />
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          <Label htmlFor="p-end">Ends</Label>
          <Input id="p-end" defaultValue="Jul 16, 2026 · 18:00" />
        </div>
      </div>
    </PopoverContent>
  </Popover>
);
