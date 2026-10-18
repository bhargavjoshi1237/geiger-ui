import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@geiger/ui";
import { ChevronsUpDown, Building2, Plus } from "lucide-react";

export const WorkspaceSwitcher = () => (
  <DropdownMenu defaultOpen>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">
        Acme Inc.
        <ChevronsUpDown />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" style={{ width: 240 }}>
      <DropdownMenuLabel>Organizations</DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Building2 />
          Acme Inc.
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Building2 />
          Northwind Events
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Plus />
        New organization
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export const InsetSections = () => (
  <DropdownMenu defaultOpen>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">Sort issues</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" style={{ width: 220 }}>
      <DropdownMenuLabel inset>Order by</DropdownMenuLabel>
      <DropdownMenuItem inset>Priority</DropdownMenuItem>
      <DropdownMenuItem inset>Due date</DropdownMenuItem>
      <DropdownMenuItem inset>Last updated</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuLabel inset>Direction</DropdownMenuLabel>
      <DropdownMenuItem inset>Ascending</DropdownMenuItem>
      <DropdownMenuItem inset>Descending</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
