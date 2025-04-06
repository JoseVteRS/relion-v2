import { DashboardPageTitle } from "@/components/dashboard-page-title";
import { PresentsView } from "@/modules/presents/ui/views/presents-view";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/presents")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>

      <Outlet />
    </>
  );
}
