import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useConfirm } from "@/hooks/use-confirm";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/react";
import { ItemStatus, List } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import {
  CalendarIcon,
  ClockIcon,
  EyeIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import { toast } from "sonner";
import { CopyToClipboard } from "./copy-clipboard";

interface ListCardProps {
  list: List;
}

const statusStyles = {
  [ItemStatus.DRAFT]: "bg-yellow-50 text-yellow-800 border-yellow-200",
  [ItemStatus.PUBLISHED]: "bg-green-50 text-green-800 border-green-200",
  [ItemStatus.ARCHIVED]: "bg-gray-50 text-gray-800 border-gray-200",
};

export const ListCard = ({ list }: ListCardProps) => {
  const queryClient = useQueryClient();
  const [ConfirmDeleteListDialog, confirmDeleteList] = useConfirm(
    "¿Eliminar lista?",
    `Se eliminará la lista ${list.name} permanentemente sin posibilidad de recuperación.`
  );

  const trpc = useTRPC();
  const deleteListQueryKey = trpc.list.get.queryKey();
  const deleteList = useMutation(
    trpc.list.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: deleteListQueryKey });
        toast.success(`Lista ${list.name} eliminada correctamente`);
      },
      onError: (error) => {
        toast.error(`Error al eliminar la lista ${list.name}`);
      },
    })
  );

  const handleDeleteList = async () => {
    const ok = await confirmDeleteList();
    if (ok) {
      deleteList.mutate({ id: list.id });
    }
  };

  return (
    <>
      <Card
        className={cn(
          "transition-all shadow-none hover:shadow-md",
          list.status === ItemStatus.DRAFT && "bg-stripe-draft border-dashed"
        )}
      >
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold">
                {list.name}
              </CardTitle>
              <div className="flex items-center text-primary text-lg font-medium">
                <CalendarIcon className="mr-2 h-5 w-5" />
                {format(list.eventDate, "PPP", { locale: es })}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Badge
                variant="outline"
                className={cn("border", statusStyles[list.status])}
              >
                {list.status === ItemStatus.DRAFT ? "Borrador" : list.status === ItemStatus.PUBLISHED ? "Publicada" : "Archivada"}
              </Badge>
              {/* <Badge variant="outline" className={cn("border", visibilityStyles[list.visibility])}>
              {list.visibility === ItemVisibility.PUBLIC ? "Pública" : "Privada"}
            </Badge> */}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="text-xs text-muted-foreground space-y-1">
              <p className="flex items-center">
                <ClockIcon className="h-3 w-3 mr-1" />
                <span className="font-medium">Creada:</span>
                &nbsp;
                {format(list.createdAt, "PPP 'a las' HH:mm", { locale: es })}
              </p>
              <p className="flex items-center">
                <ClockIcon className="h-3 w-3 mr-1" />
                <span className="font-medium">Modificada:</span>
                &nbsp;
                {format(list.updatedAt, "PPP 'a las' HH:mm", { locale: es })}
              </p>
            </div>

            <div className="flex gap-2 pt-2 justify-end">
              <Button variant="default" size="default" asChild>
                <Link
                  to={`/dashboard/lists/$listId`}
                  params={{ listId: list.id }}
                >
                  <EyeIcon className="h-4 w-4 mr-2" />
                  Ver lista
                </Link>
              </Button>
              <Button variant="outline" size="default" asChild>
                <Link
                  to={`/dashboard/lists/$listId/edit`}
                  params={{ listId: list.id }}
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Editar
                </Link>
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={handleDeleteList}
              >
                <Trash2Icon />
              </Button>
              <CopyToClipboard text={`${window.location.origin}/list/${list.id}/public`} />
            </div>
          </div>
        </CardContent>
      </Card>
      <ConfirmDeleteListDialog />
    </>
  );
};