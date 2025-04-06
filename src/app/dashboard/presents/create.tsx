import { PresentCreateSection } from '@/modules/presents/ui/sections/present-create-section'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/presents/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PresentCreateSection />
}
