"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    getAnonymousPickInfo,
    removeAnonymousPickInfo,
    saveAnonymousPickInfo,
} from "@/lib/anonymous-picks";
import { useSession } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, LinkIcon } from "lucide-react";
import { toast } from "sonner";

interface PresentCardProps {
  present: {
    id: string;
    name: string;
    description?: string | null;
    externalLink?: string | null;
    pickedStatus: "UNPICKED" | "PICKED" | "BOUGHT";
    pickedByUserId?: string | null;
  };
  listId: string;
}

export const PresentCard = ({ present, listId }: PresentCardProps) => {
  const session = useSession;
  const trpc = useTRPC();

  const queryClient = useQueryClient();
  const listQueryKey = trpc.list.getListWithPresentPublic.queryKey({
    id: listId,
  });

  const pickedMutation = useMutation(
    trpc.present.pick.mutationOptions({
      onSuccess: (response: any) => {
        if ("pickToken" in response) {
          // Usuario anónimo - guardar token
          saveAnonymousPickInfo(present.id, response.pickToken);
        }
        queryClient.invalidateQueries({ queryKey: listQueryKey });
        toast.success("Regalo elegido correctamente");
      },
      onError: () => {
        toast.error("Error al elegir el regalo");
      },
    })
  );

  const unpickMutation = useMutation(
    trpc.present.unpick.mutationOptions({
      onSuccess: () => {
        removeAnonymousPickInfo(present.id);
        queryClient.invalidateQueries({ queryKey: listQueryKey });
        toast.success("Regalo desmarcado correctamente");
      },
      onError: (error: any) => {
        toast.error(error.message || "Error al desmarcar el regalo");
      },
    })
  );

  const markAsBoughtMutation = useMutation(
    trpc.present.markAsBought.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: listQueryKey });
        toast.success("Regalo marcado como comprado");
      },
      onError: (error: any) => {
        toast.error(error.message || "Error al marcar el regalo como comprado");
      },
    })
  );

  const handlePick = () => {
    pickedMutation.mutate({ presentId: present.id });
  };

  const handleUnpick = () => {
    const pickInfo = getAnonymousPickInfo(present.id);
    unpickMutation.mutate({
      presentId: present.id,
      pickToken: pickInfo?.pickToken,
    });
  };

  const handleMarkAsBought = () => {
    const pickInfo = getAnonymousPickInfo(present.id);
    markAsBoughtMutation.mutate({
      presentId: present.id,
      pickToken: pickInfo?.pickToken,
    });
  };

  const isPickedByMe =
    session.get()?.data?.user.id === present.pickedByUserId ||
    getAnonymousPickInfo(present.id) !== null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{present.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {present.description && (
          <p className="text-muted-foreground mb-4">{present.description}</p>
        )}
        {present.externalLink && (
          <a
            href={present.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <LinkIcon className="h-4 w-4" />
            <span>Ver enlace</span>
          </a>
        )}
        <div className="mt-4 space-y-2">
          {present.pickedStatus === "UNPICKED" && (
            <Button className="w-full" onClick={handlePick}>
              Elegir regalo
            </Button>
          )}

          {isPickedByMe && present.pickedStatus === "PICKED" && (
            <>
              <Button
                className="w-full"
                variant="outline"
                onClick={handleUnpick}
              >
                Liberar regalo
              </Button>
              <Button className="w-full" onClick={handleMarkAsBought}>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Marcar como comprado
              </Button>
            </>
          )}

          {!isPickedByMe && present.pickedStatus !== "UNPICKED" && (
            <div className="text-center text-muted-foreground">
              Este regalo ya ha sido elegido por otro usuario
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
