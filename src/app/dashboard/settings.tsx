import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/settings")({
  component: DashboardSettings,
});

function DashboardSettings() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Configuración</h1>
      <div className="">
        SETTINGS
      </div>
    </div>
  );
} 