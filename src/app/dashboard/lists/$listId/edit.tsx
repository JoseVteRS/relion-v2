import { ListEditView } from "@/modules/lists/ui/views/lists-edit-view";
import { useTRPC } from "@/trpc/react";
import { usePrefetchQuery, useQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/lists/$listId/edit")({
  loader: async ({ context: { trpc, queryClient }, params: { listId } }) => {
    await queryClient.ensureQueryData(
      trpc.list.getById.queryOptions({ id: listId })
    );
    return;
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <ListEditView />;
}
