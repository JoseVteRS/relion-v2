import { PresentEditSection } from '@/modules/presents/ui/sections/present-edit-section';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute("/dashboard/presents/$presentId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PresentEditSection />;
}
