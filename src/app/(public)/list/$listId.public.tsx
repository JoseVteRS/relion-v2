import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IListWithPresentPublic } from "@/modules/lists/interfaces";
import { PublicPublicItem } from "@/modules/presents/ui/components/present-public-item";
import { useTRPC } from "@/trpc/react";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { UserIcon } from "lucide-react";

export const Route = createFileRoute("/(public)/list/$listId/public")({
  loader: async ({ context: { trpc, queryClient }, params: { listId } }) => {
    await queryClient.ensureQueryData(
      trpc.list.getListWithPresentPublic.queryOptions({ id: listId })
    );
  },
  pendingComponent: () => <div>Cargando lista...</div>,
  component: RouteComponent,
});

function RouteComponent() {
  const { listId } = Route.useParams();
  const trpc = useTRPC();

  const listQueryOptions = trpc.list.getListWithPresentPublic.queryOptions({
    id: listId,
  });
  const listQuery = useQuery(listQueryOptions);
  const list = listQuery.data;


  if (!list) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg text-muted-foreground">
            No hay listas publicas
          </p>
        </div>
      </div>
    );
  }

  if (!list.presents.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">
            No hay regalos en esta lista
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-8 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            {list.name}
          </CardTitle>
          <div className="flex items-center gap-2 text-muted-foreground">
            <UserIcon className="h-4 w-4" />
            <span>{list.owner.name}</span>
            {list.eventDate && (
              <span className="ml-4">
                {format(new Date(list.eventDate), "d 'de' MMMM 'de' yyyy", {
                  locale: es,

                })}
              </span>
            )}
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.presents.map((present) => (
          <PublicPublicItem key={present.id} present={present} />
        ))}
      </div>
    </div>
  );
}
