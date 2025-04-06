import { PresentsView } from "@/modules/presents/ui/views/presents-view";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/presents/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PresentsView />;
}
