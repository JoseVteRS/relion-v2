import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/lists")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>

      <Outlet />
    </>
  );
}
