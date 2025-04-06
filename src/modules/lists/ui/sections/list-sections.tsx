import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTRPC } from "@/trpc/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { AlertCircle, FilePlus, ListPlus, RefreshCcw } from "lucide-react";
import { ListCard } from "../components/list-card-component";

const ListsSkeletonSection = () => {
  return (
    <Card className="transition-all shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <Skeleton className="h-7 w-48" /> {/* Título */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5" /> {/* Icono calendario */}
              <Skeleton className="h-6 w-32" /> {/* Fecha */}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-24" /> {/* Badge de estado */}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-3" /> {/* Icono reloj */}
              <Skeleton className="h-4 w-48" /> {/* Fecha creación */}
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-3" /> {/* Icono reloj */}
              <Skeleton className="h-4 w-52" /> {/* Fecha modificación */}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Skeleton className="h-9 flex-1" /> {/* Botón Ver */}
            <Skeleton className="h-9 flex-1" /> {/* Botón Editar */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ListsErrorSection = () => {
  const trpc = useTRPC();
  const options = trpc.list.get.queryOptions();
  const { refetch } = useQuery(options);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-center p-8 border-2 border-dashed rounded-xl">
      <div className="p-4 rounded-full bg-destructive/10">
        <AlertCircle className="h-12 w-12 text-destructive" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">¡Ups! Algo salió mal</h3>
        <p className="text-muted-foreground max-w-sm">
          No pudimos cargar tus listas. Por favor, intenta nuevamente o crea una
          nueva lista.
        </p>
      </div>
      <div className="flex gap-3 pt-4">
        <Button onClick={() => refetch()} variant="outline" size="lg">
          <RefreshCcw className="mr-2 h-4 w-4" />
          Reintentar
        </Button>
        <Button asChild size="lg">
          <Link to="/dashboard/lists/create">
            <ListPlus className="mr-2 h-4 w-4" />
            Crear nueva lista
          </Link>
        </Button>
      </div>
    </div>
  );
};

const ListsEmptySection = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-center p-8 border-2 border-dashed rounded-xl bg-muted/10">
      <div className="p-4 rounded-full bg-primary/10">
        <FilePlus className="h-12 w-12 text-primary" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">No hay listas creadas</h3>
        <p className="text-muted-foreground max-w-sm">
          Comienza creando tu primera lista para organizar tus eventos y
          regalos.
        </p>
      </div>
      <Button asChild size="lg" className="mt-4">
        <Link to="/dashboard/lists/create">
          <ListPlus className="mr-2 h-4 w-4" />
          Crear mi primera lista
        </Link>
      </Button>
    </div>
  );
};

export const ListSections = () => {
  const trpc = useTRPC();
  const options = trpc.list.get.queryOptions(undefined, {
    retry: 3,
  });
  const { data: lists, isLoading, isError } = useQuery(options);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
          {Array.from({ length: 4 }, (_, index) => (
            <ListsSkeletonSection key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return <ListsErrorSection />;
  }

  if (!lists?.length) {
    return <ListsEmptySection />;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
        {lists?.map((list) => <ListCard key={list.id} list={list} />)}
      </div>
    </div>
  );
};
