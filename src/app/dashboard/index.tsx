import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
});

function DashboardIndex() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Panel de Control</h1>
      <p className="text-muted-foreground">
        Bienvenido al panel de control de tu cuenta.
      </p>
    </div>
  );
} 