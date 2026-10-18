import { useEffect } from "react";
import { toast } from "sonner";
import { Toaster } from "@geiger/ui";

export const ToastStack = () => {
  useEffect(() => {
    toast("Invite sent", { description: "Maya Chen will get an email to join Acme Studio." });
    toast.error("Couldn't save the event", { description: "Check your connection and try again." });
    toast.success("Event published", { description: "Summer Launch Party is now live." });
  }, []);
  return <Toaster expand position="bottom-right" duration={600000} />;
};
