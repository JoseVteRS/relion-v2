import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { IListWithPresentPublic } from "@/modules/lists/interfaces";
import { PickedStatus } from "@prisma/client";
import {
  AlertTriangle,
  CheckCircle2,
  Gift,
  LinkIcon,
  LockIcon,
  ShoppingBag,
  Undo2,
  Users,
} from "lucide-react";
import { usePresent } from "../../hooks/usePresent";

interface PublicPublicItemProps {
  present: IListWithPresentPublic["presents"][0];
}

export const PublicPublicItem = ({ present }: PublicPublicItemProps) => {
  const {
    handlePick,
    handleUnpick,
    handleMarkAsBought,
    isPickedByMe,
    canUserPickMore,
    isPending,
  } = usePresent(present);

  console.log({ present });

  // Determinar el estado visual de la tarjeta según el estado del regalo
  const cardVariant = {
    UNPICKED: "",
    PICKED:
      "border-amber-300 bg-amber-50 dark:bg-amber-950/30 bg-stripe-picked",
    BOUGHT: "border-green-300 bg-green-50 dark:bg-green-950/30",
  }[present.pickedStatus];

  // Badge para mostrar el estado
  const statusBadge = {
    UNPICKED: (
      <Badge variant="outline" className="flex gap-1 items-center">
        <Gift className="h-3 w-3" />
        Disponible
      </Badge>
    ),
    PICKED: (
      <Badge className="flex gap-1 items-center bg-amber-500">
        <ShoppingBag className="h-3 w-3" />
        Reservado
      </Badge>
    ),
    BOUGHT: (
      <Badge className="flex gap-1 items-center bg-green-500">
        <CheckCircle2 className="h-3 w-3" />
        Comprado
      </Badge>
    ),
  }[present.pickedStatus];

  return (
    <>
      <Card className={cn("shadow-none", cardVariant)}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle>{present.name}</CardTitle>
            {statusBadge}
          </div>
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
              <span>Ver en tienda</span>
            </a>
          )}
        </CardContent>
        <CardFooter className="flex flex-col pt-2 gap-2">
          {present.pickedStatus === "UNPICKED" && (
            <>
              <Button
                className="w-full"
                onClick={handlePick}
                disabled={!canUserPickMore || isPending}
                variant="default"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Reservar regalo
              </Button>
              {!canUserPickMore && (
                <div className="text-sm text-amber-600 dark:text-amber-400 flex items-start gap-2 mt-1 p-2 bg-amber-50 dark:bg-amber-950/30 rounded-md">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <div>
                    Has alcanzado el límite de regalos que puedes elegir.
                    <Button variant="link" asChild className="px-1 h-auto">
                      <a href="/auth/register" className="font-bold">
                        Regístrate
                      </a>
                    </Button>
                    para elegir más.
                  </div>
                </div>
              )}
            </>
          )}

          {isPickedByMe && present.pickedStatus === PickedStatus.PICKED && (
            <>
              <Button
                className="w-full"
                variant="outline"
                onClick={handleUnpick}
                disabled={isPending}
              >
                <Undo2 className="mr-2 h-4 w-4" />
                Liberar regalo
              </Button>
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={handleMarkAsBought}
                disabled={isPending}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Marcar como comprado
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </>
  );
};
