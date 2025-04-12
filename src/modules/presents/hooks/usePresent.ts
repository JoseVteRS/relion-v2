import { useSession } from "@/lib/auth-client";
import { IListWithPresentPublic } from "@/modules/lists/interfaces";
import { useTRPC } from "@/trpc/react";
import { Present } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Session } from "better-auth";
import { Atom } from "better-auth/client";
import { useState } from "react";
import { toast } from "sonner";

const MAX_PICK_QUOTA_FREE_USER = 5;

export const usePresent = (
  present: IListWithPresentPublic["presents"][0]
) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const session = useSession();

  const listQueryKey = trpc.list.getListWithPresentPublic.queryKey({
    id: present?.listId ?? "",
  });

  const pickMutation = useMutation(
    trpc.present.pick.mutationOptions({
      onSuccess: () => {
        toast.success("Regalo seleccionado con éxito");
        queryClient.invalidateQueries({ queryKey: listQueryKey });
      },
      onError: () => {
        toast.error(`No se pudo seleccionar el regalo`);
      },
    })
  );

  // Mutación para desmarcar un regalo
  const unpickMutation = useMutation(
    trpc.present.unpick.mutationOptions({
      onSuccess: () => {
        toast.success("Regalo desmarcado con éxito");
        queryClient.invalidateQueries({ queryKey: listQueryKey });
      },
      onError: () => {
        toast.error(`No se pudo desmarcar el regalo`);
      },
    })
  );

  // Mutación para marcar un regalo como comprado
  const markAsBoughtMutation = useMutation(
    trpc.present.markAsBought.mutationOptions({
      onSuccess: () => {
        toast.success("Regalo marcado como comprado con éxito");
        queryClient.invalidateQueries({ queryKey: listQueryKey });
      },
      onError: () => {
        toast.error(`No se pudo marcar el regalo como comprado`);
      },
    })
  );

  // Función para elegir un regalo
  const handlePick = async () => {
    if (!present) return;

    if (!session) {
      // TODO: Mostrar modal para iniciar sesión o redireccionar a la página de inicio de sesión
      toast.error("Debes iniciar sesión para elegir un regalo");
      return;
    }

    await pickMutation.mutateAsync({ presentId: present.id });
  };

  // Función para desmarcar un regalo
  const handleUnpick = async () => {
    if (!present) return;

    if (!session) {
      toast.error("Debes iniciar sesión para desmarcar un regalo");
      return;
    }

    await unpickMutation.mutateAsync({ presentId: present.id });
  };

  // Función para marcar un regalo como comprado
  const handleMarkAsBought = async () => {
    if (!present) return;

    if (!session) {
      toast.error("Debes iniciar sesión para marcar un regalo como comprado");
      return;
    }

    await markAsBoughtMutation.mutateAsync({ presentId: present.id });
  };

  const isPickedByMe = present?.pickedBy?.id === session?.data?.user.id;
  const canUserPickMore = true ? true : MAX_PICK_QUOTA_FREE_USER;

  return {
    handlePick,
    handleUnpick,
    handleMarkAsBought,
    isPickedByMe,
    canUserPickMore,
    isPending:
      pickMutation.isPending ||
      unpickMutation.isPending ||
      markAsBoughtMutation.isPending,
  };
};
