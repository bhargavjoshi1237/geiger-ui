import * as React from "react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@geiger/ui";
import { Pencil, Copy, Link2, Trash2 } from "lucide-react";

// Radix ContextMenu has no `open` prop; open it with a real right-click event at a point in the area.
function useRightClickAt(x: number, y: number) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.dispatchEvent(
      new MouseEvent("contextmenu", {
        bubbles: true,
        cancelable: true,
        button: 2,
        clientX: r.left + x,
        clientY: r.top + y,
      }),
    );
  }, [x, y]);
  return ref;
}

const area = {
  width: 360,
  height: 120,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8,
  border: "1px dashed var(--border)",
  fontSize: 13,
  color: "var(--muted-foreground)",
} as const;

export const IssueRowActions = () => {
  const ref = useRightClickAt(24, 24);
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div ref={ref} style={area}>
          Right-click an issue
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent style={{ width: 220 }}>
        <ContextMenuItem>
          <Pencil />
          Edit issue
          <ContextMenuShortcut>E</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Copy />
          Duplicate
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Link2 />
          Copy link
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Move to project</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Platform roadmap</ContextMenuItem>
            <ContextMenuItem>Summer Summit 2026</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <Trash2 />
          Delete
          <ContextMenuShortcut>⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export const ViewOptions = () => {
  const ref = useRightClickAt(24, 24);
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div ref={ref} style={area}>
          Right-click the board
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent style={{ width: 220 }}>
        <ContextMenuLabel>Display</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>Show assignees</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem checked>Show due dates</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show estimates</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuLabel>Group by</ContextMenuLabel>
        <ContextMenuRadioGroup value="status">
          <ContextMenuRadioItem value="status">Status</ContextMenuRadioItem>
          <ContextMenuRadioItem value="priority">Priority</ContextMenuRadioItem>
          <ContextMenuRadioItem value="assignee">Assignee</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
};
