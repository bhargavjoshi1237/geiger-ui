import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "@geiger/ui";

export const IssueStatusOpen = () => (
  <div style={{ width: 220 }}>
    <Select defaultOpen defaultValue="in-progress">
      <SelectTrigger>
        <SelectValue placeholder="Set status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="backlog">Backlog</SelectItem>
        <SelectItem value="todo">Todo</SelectItem>
        <SelectItem value="in-progress">In progress</SelectItem>
        <SelectItem value="in-review">In review</SelectItem>
        <SelectItem value="done">Done</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

export const GroupedProjects = () => (
  <div style={{ width: 240 }}>
    <Select defaultOpen defaultValue="summit">
      <SelectTrigger>
        <SelectValue placeholder="Select a project" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Acme Inc.</SelectLabel>
          <SelectItem value="summit">Summer Summit 2026</SelectItem>
          <SelectItem value="roadmap">Platform roadmap</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Personal</SelectLabel>
          <SelectItem value="notes">Research notes</SelectItem>
          <SelectItem value="archive" disabled>
            Archived drafts
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
);

export const ClosedStates = () => (
  <div style={{ display: "grid", gap: 12, width: 220 }}>
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Choose a plan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="free">Free</SelectItem>
        <SelectItem value="pro">Pro</SelectItem>
      </SelectContent>
    </Select>
    <Select defaultValue="pro">
      <SelectTrigger size="sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="free">Free</SelectItem>
        <SelectItem value="pro">Pro · $12 per seat</SelectItem>
      </SelectContent>
    </Select>
    <Select disabled defaultValue="owner">
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="owner">Owner</SelectItem>
      </SelectContent>
    </Select>
  </div>
);
