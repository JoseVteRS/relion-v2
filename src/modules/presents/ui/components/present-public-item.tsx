import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Gift,
  LinkIcon,
  LockIcon,
  ShoppingBag,
  Undo2,
  Users,
} from "lucide-react";
import { useState } from "react";
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
  
  // Estado para gestionar el modal de enlace externo
  const [isExternalLinkModalOpen, setIsExternalLinkModalOpen] = useState(false);
  const [externalUrl, setExternalUrl] = useState<string | null>(null);
  
  // Función para manejar los clics en enlaces externos
  const handleExternalLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (present.externalLink) {
      setExternalUrl(present.externalLink);
      setIsExternalLinkModalOpen(true);
    }
  };
  
  // Función para continuar al enlace externo
  const handleContinueToExternalLink = () => {
    if (externalUrl) {
      window.open(externalUrl, "_blank", "noopener,noreferrer");
    }
    setIsExternalLinkModalOpen(false);
  };
  
  // Extraer el hostname para mostrar en el enlace y en el modal
  const getHostname = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace('www.', '');
    } catch (e) {
      return 'enlace externo';
    }
  };
  
  // Obtener el hostname si hay un enlace externo
  const hostname = present.externalLink ? getHostname(present.externalLink) : '';

  // Determinar el estado visual de la tarjeta según el estado del regalo
  const cardVariant = {
    UNPICKED: "border-zinc-200 bg-white dark:bg-zinc-800/50 dark:border-zinc-700 dark:backdrop-blur-sm",
    PICKED: "border-zinc-200 bg-white dark:bg-zinc-800/50 dark:border-zinc-700 dark:border-l-amber-500 border-l-4 border-l-amber-400 dark:backdrop-blur-sm bg-stripe-picked",
    BOUGHT: "border-zinc-200 bg-white dark:bg-zinc-800/50 dark:border-zinc-700 dark:border-l-zinc-500 border-l-4 border-l-zinc-400 dark:backdrop-blur-sm",
  }[present.pickedStatus];

  // Badge para mostrar el estado
  const statusBadge = {
    UNPICKED: (
      <Badge variant="outline" className="flex gap-1 items-center dark:border-zinc-600 dark:bg-zinc-700/50">
        <Gift className="h-3 w-3" />
        Disponible
      </Badge>
    ),
    PICKED: (
      <Badge variant="secondary" className="flex gap-1 items-center dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800">
        <ShoppingBag className="h-3 w-3" />
        Reservado
      </Badge>
    ),
    BOUGHT: (
      <Badge variant="secondary" className="flex gap-1 items-center dark:bg-zinc-700 dark:text-zinc-300">
        <CheckCircle2 className="h-3 w-3" />
        Comprado
      </Badge>
    ),
  }[present.pickedStatus];

  return (
    <>
      {/* Modal de confirmación para enlaces externos */}
      <AlertDialog open={isExternalLinkModalOpen} onOpenChange={setIsExternalLinkModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              Salir de Relion
            </AlertDialogTitle>
            <AlertDialogDescription>
              Estás a punto de salir hacia{" "}
              <span className="font-medium">{hostname}</span>. ¿Quieres continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleContinueToExternalLink}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    
      <Card className={cn("flex flex-col h-full shadow-sm hover:shadow transition-all duration-200", cardVariant)}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="dark:text-zinc-200">{present.name}</CardTitle>
            {statusBadge}
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <div className="flex flex-col h-full">
            {present.description && (
              <p className="text-muted-foreground dark:text-slate-400 mb-4">{present.description}</p>
            )}
            {present.externalLink && (
              <a
                href={present.externalLink}
                onClick={handleExternalLinkClick}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline mb-4 dark:text-blue-400"
              >
                <LinkIcon className="h-4 w-4" />
                <span>{hostname}</span>
              </a>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="mt-auto pt-2">
          <div className="w-full space-y-2">
            {present.pickedStatus === PickedStatus.UNPICKED && (
              <>
                <Button
                  className="w-full dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-zinc-100"
                  onClick={handlePick}
                  disabled={!canUserPickMore || isPending}
                  variant="default"
                >
                  <Gift className="mr-2 h-4 w-4" />
                  Reservar regalo
                </Button>
                {!canUserPickMore && (
                  <div className="text-sm text-muted-foreground flex items-start gap-2 mt-1 p-2 bg-zinc-50 dark:bg-zinc-700/50 dark:text-zinc-300 rounded-md">
                    <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5 dark:text-amber-400" />
                    <div>
                      Has alcanzado el límite de regalos que puedes elegir.
                      <Button variant="link" asChild className="px-1 h-auto dark:text-blue-400">
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
                  className="w-full dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 dark:border-zinc-600"
                  variant="outline"
                  onClick={handleUnpick}
                  disabled={isPending}
                >
                  <Undo2 className="mr-2 h-4 w-4" />
                  Liberar regalo
                </Button>
                <Button 
                  className="w-full dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-zinc-100"
                  onClick={handleMarkAsBought}
                  disabled={isPending}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Marcar como comprado
                </Button>
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </>
  );
};
