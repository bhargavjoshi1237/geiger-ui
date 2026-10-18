import * as React from "react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
} from "@geiger/ui";
import { Download, FolderInput, Trash2, Eye } from "lucide-react";

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

export const FileHeading = () => {
  const ref = useRightClickAt(24, 24);
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div ref={ref} style={area}>
          venue-floorplan.pdf
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent style={{ width: 220 }}>
        <ContextMenuLabel>venue-floorplan.pdf</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Eye />
          Preview
        </ContextMenuItem>
        <ContextMenuItem>
          <Download />
          Download
        </ContextMenuItem>
        <ContextMenuItem>
          <FolderInput />
          Move to folder
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <Trash2 />
          Delete file
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export const InsetSections = () => {
  const ref = useRightClickAt(24, 24);
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div ref={ref} style={area}>
          Jane Cooper · Attendee
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent style={{ width: 220 }}>
        <ContextMenuLabel inset>Guest</ContextMenuLabel>
        <ContextMenuItem inset>View profile</ContextMenuItem>
        <ContextMenuItem inset>Resend ticket</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuLabel inset>Check-in</ContextMenuLabel>
        <ContextMenuItem inset>Mark as arrived</ContextMenuItem>
        <ContextMenuItem inset disabled>
          Print badge
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
