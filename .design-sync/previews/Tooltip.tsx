import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  Button,
} from "@geiger/ui";
import { Plus, Archive } from "lucide-react";

export const IconButtonTop = () => (
  <TooltipProvider>
    <div style={{ paddingTop: 48, paddingLeft: 48 }}>
      <Tooltip defaultOpen>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" aria-label="New issue">
            <Plus />
          </Button>
        </TooltipTrigger>
        <TooltipContent>New issue</TooltipContent>
      </Tooltip>
    </div>
  </TooltipProvider>
);

export const ShortcutBottom = () => (
  <TooltipProvider>
    <div style={{ paddingLeft: 48 }}>
      <Tooltip defaultOpen>
        <TooltipTrigger asChild>
          <Button variant="ghost">
            <Archive />
            Archive
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Move to archive (E)</TooltipContent>
      </Tooltip>
    </div>
  </TooltipProvider>
);

export const SideRight = () => (
  <TooltipProvider>
    <div style={{ paddingTop: 24 }}>
      <Tooltip defaultOpen>
        <TooltipTrigger asChild>
          <Button variant="secondary">Billing</Button>
        </TooltipTrigger>
        <TooltipContent side="right">Only owners can change the plan</TooltipContent>
      </Tooltip>
    </div>
  </TooltipProvider>
);
