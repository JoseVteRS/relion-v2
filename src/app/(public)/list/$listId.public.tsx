import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { IListWithPresentPublic } from "@/modules/lists/interfaces";
import { PublicPublicItem } from "@/modules/presents/ui/components/present-public-item";
import { useTRPC } from "@/trpc/react";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, Gift, Heart, Share2, UserIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/(public)/list/$listId/public")({
  loader: async ({ context: { trpc, queryClient }, params: { listId } }) => {
    await queryClient.ensureQueryData(
      trpc.list.getListWithPresentPublic.queryOptions({ id: listId })
    );
  },
  pendingComponent: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-lg text-muted-foreground">
          Cargando lista de regalos...
        </p>
      </div>
    </div>
  ),
  component: RouteComponent,
});

function RouteComponent() {
  const { listId } = Route.useParams();
  const trpc = useTRPC();
  const [isShareButtonClicked, setIsShareButtonClicked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const listQueryOptions = trpc.list.getListWithPresentPublic.queryOptions({
    id: listId,
  });
  const listQuery = useQuery(listQueryOptions);
  const list = listQuery.data;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Lista de regalos: ${list?.name}`,
          text: `Mira la lista de regalos de ${list?.owner.name}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error al compartir:", error);
      }
    } else {
      // Fallback si la API Web Share no está disponible
      navigator.clipboard.writeText(window.location.href);
      setIsShareButtonClicked(true);
      setTimeout(() => setIsShareButtonClicked(false), 2000);
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Aquí se implementaría la lógica para guardar en favoritos
    if (!isFavorite) {
      toast.success("Lista guardada en favoritos");
    } else {
      toast.success("Lista eliminada de favoritos");
    }
  };

  if (!list) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg text-muted-foreground">
            Cargando datos...
          </p>
        </div>
      </div>
    );
  }

  if (!list.presents.length) {
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
                <span className="ml-4 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {format(new Date(list.eventDate), "d 'de' MMMM 'de' yyyy", {
                    locale: es,
                  })}
                </span>
              )}
            </div>
          </CardHeader>
        </Card>
        
        <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg p-12 text-center">
          <Gift className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No hay regalos en esta lista</h3>
          <p className="text-muted-foreground">
            El propietario de la lista aún no ha añadido ningún regalo.
          </p>
        </div>
      </div>
    );
  }

  // Contar regalos por estado
  const unpickedCount = list.presents.filter(p => p.pickedStatus === "UNPICKED").length;
  const pickedCount = list.presents.filter(p => p.pickedStatus === "PICKED").length;
  const boughtCount = list.presents.filter(p => p.pickedStatus === "BOUGHT").length;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 overflow-hidden border-slate-200 dark:border-slate-800">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
            <Gift className="w-full h-full" />
          </div>
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <CardTitle className="text-3xl font-bold">
                  {list.name}
                </CardTitle>
                <CardDescription className="flex items-center mt-2 text-base">
                  <UserIcon className="h-4 w-4 mr-1.5" />
                  <span className="font-medium">Lista de: <strong>{list.owner.name}</strong></span>
                </CardDescription>
                
                {list.eventDate && (
                  <p className="flex items-center text-muted-foreground mt-1">
                    <Calendar className="h-4 w-4 mr-1.5" />
                    <span>Fecha del evento: <strong>{format(new Date(list.eventDate), "d 'de' MMMM 'de' yyyy", {
                      locale: es,
                    })}</strong></span>
                  </p>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant={isFavorite ? "default" : "outline"}
                  size="sm" 
                  className={cn("gap-2", isFavorite && "bg-rose-600 hover:bg-rose-700 border-rose-600")}
                  onClick={handleFavorite}
                  title={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
                >
                  <Heart className={cn("h-4 w-4", isFavorite && "fill-white")} />
                  <span className="hidden sm:inline">
                    {isFavorite ? "Guardada" : "Guardar"}
                  </span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {isShareButtonClicked ? "¡Enlace copiado!" : "Compartir"}
                  </span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mt-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-md bg-white/90 dark:bg-slate-800 p-2 shadow-sm border border-slate-200 dark:border-slate-700">
                  <p className="text-sm font-medium text-muted-foreground">Disponibles</p>
                  <p className="text-2xl font-bold">{unpickedCount}</p>
                </div>
                <div className="rounded-md bg-white/90 dark:bg-slate-800 p-2 shadow-sm border border-slate-200 dark:border-slate-700">
                  <p className="text-sm font-medium text-muted-foreground">Reservados</p>
                  <p className="text-2xl font-bold">{pickedCount}</p>
                </div>
                <div className="rounded-md bg-white/90 dark:bg-slate-800 p-2 shadow-sm border border-slate-200 dark:border-slate-700">
                  <p className="text-sm font-medium text-muted-foreground">Comprados</p>
                  <p className="text-2xl font-bold">{boughtCount}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.presents.map((present) => (
          <PublicPublicItem key={present.id} present={present} />
        ))}
      </div>
    </div>
  );
}
