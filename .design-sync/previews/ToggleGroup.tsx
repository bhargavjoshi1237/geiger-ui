import { ToggleGroup, ToggleGroupItem } from "@geiger/ui";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, LayoutGrid, List, Kanban } from "lucide-react";

export const Formatting = () => (
  <ToggleGroup type="multiple" variant="outline" defaultValue={["bold", "italic"]}>
    <ToggleGroupItem value="bold" aria-label="Bold"><Bold /></ToggleGroupItem>
    <ToggleGroupItem value="italic" aria-label="Italic"><Italic /></ToggleGroupItem>
    <ToggleGroupItem value="underline" aria-label="Underline"><Underline /></ToggleGroupItem>
  </ToggleGroup>
);

export const Alignment = () => (
  <ToggleGroup type="single" defaultValue="left">
    <ToggleGroupItem value="left" aria-label="Align left"><AlignLeft /></ToggleGroupItem>
    <ToggleGroupItem value="center" aria-label="Align center"><AlignCenter /></ToggleGroupItem>
    <ToggleGroupItem value="right" aria-label="Align right"><AlignRight /></ToggleGroupItem>
  </ToggleGroup>
);

export const ViewSwitcher = () => (
  <ToggleGroup type="single" variant="outline" defaultValue="board">
    <ToggleGroupItem value="list"><List /> List</ToggleGroupItem>
    <ToggleGroupItem value="board"><Kanban /> Board</ToggleGroupItem>
    <ToggleGroupItem value="grid"><LayoutGrid /> Grid</ToggleGroupItem>
  </ToggleGroup>
);

export const WithDisabled = () => (
  <ToggleGroup type="single" variant="outline" size="sm" defaultValue="week">
    <ToggleGroupItem value="day">Day</ToggleGroupItem>
    <ToggleGroupItem value="week">Week</ToggleGroupItem>
    <ToggleGroupItem value="month">Month</ToggleGroupItem>
    <ToggleGroupItem value="year" disabled>Year</ToggleGroupItem>
  </ToggleGroup>
);
