import { ListCreateSection } from '@/modules/lists/ui/sections/list-create-section'
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/dashboard/lists/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ListCreateSection />
}
