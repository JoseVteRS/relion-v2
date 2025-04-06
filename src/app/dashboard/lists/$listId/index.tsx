import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/lists/$listId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/lists/$listId/"!</div>
}
