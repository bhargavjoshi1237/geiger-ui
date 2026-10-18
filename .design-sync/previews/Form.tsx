import * as React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Input,
  Button,
} from "@geiger/ui";

type ProjectValues = { name: string; slug: string };

const ProjectForm = ({ withErrors }: { withErrors?: boolean }) => {
  const form = useForm<ProjectValues>({
    defaultValues: withErrors ? { name: "", slug: "Mobile App!" } : { name: "Mobile app redesign", slug: "mobile-app" },
  });

  React.useEffect(() => {
    if (!withErrors) return;
    form.setError("name", { type: "required", message: "Project name is required." });
    form.setError("slug", { type: "pattern", message: "Use lowercase letters, numbers and dashes only." });
  }, [withErrors, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        style={{ display: "flex", flexDirection: "column", gap: 18, width: 340 }}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Q4 launch" {...field} />
              </FormControl>
              <FormDescription>Shown in the sidebar and on every issue.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL slug</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>geiger.app/acme/{field.value || "…"}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <Button type="button" variant="ghost">Cancel</Button>
          <Button type="submit">Create project</Button>
        </div>
      </form>
    </Form>
  );
};

export const Default = () => <ProjectForm />;

export const ValidationErrors = () => <ProjectForm withErrors />;
