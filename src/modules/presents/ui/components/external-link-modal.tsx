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
import { ExternalLink } from "lucide-react";

interface ExternalLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  siteName: string;
  hostname: string;
}

export const ExternalLinkModal = ({
  isOpen,
  onClose,
  onConfirm,
  siteName,
  hostname,
}: ExternalLinkModalProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Salir de {siteName}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Estás a punto de salir hacia{" "}
            <span className="font-medium">{hostname}</span>. ¿Quieres continuar?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}; 