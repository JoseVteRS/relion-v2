import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ItemStatus, ItemVisibility, List, Present } from "@prisma/client";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import {
  ClockIcon,
  Eye,
  EyeOff,
  FileEdit,
  Gift,
  Link as LinkIcon,
  ListTodo,
  Lock,
  Send,
} from "lucide-react";

interface PresentCardProps {
  present: Present & {
    list: List | null;
  };
}

const statusStyles = {
  [ItemStatus.DRAFT]: "bg-yellow-50 text-yellow-800 border-yellow-200",
  [ItemStatus.PUBLISHED]: "bg-green-50 text-green-800 border-green-200",
  [ItemStatus.ARCHIVED]: "bg-gray-50 text-gray-800 border-gray-200",
};

const visibilityStyles = {
  [ItemVisibility.PUBLIC]: "bg-blue-50 text-blue-800 border-blue-200",
  [ItemVisibility.PRIVATE]: "bg-purple-50 text-purple-800 border-purple-200",
};

const statusIcons = {
  [ItemStatus.DRAFT]: FileEdit,
  [ItemStatus.PUBLISHED]: Send,
  [ItemStatus.ARCHIVED]: Gift,
};

const visibilityIcons = {
  [ItemVisibility.PUBLIC]: Eye,
  [ItemVisibility.PRIVATE]: EyeOff,
};

const getDomainFromUrl = (url: string) => {
  try {
    const domain = new URL(url).hostname;
    return domain.startsWith('www.') ? domain.slice(4) : domain;
  } catch {
    return url;
  }
};

export const PresentItem = ({ present }: PresentCardProps) => {
  const StatusIcon = statusIcons[present.status];
  const VisibilityIcon = visibilityIcons[present.visibility];

  return (
    <Card
      className={cn(
        "transition-all shadow-none hover:shadow-sm",
        present.status === ItemStatus.DRAFT && "bg-stripe-draft border-dashed",
        present.status === ItemStatus.ARCHIVED && "opacity-75",
        present.visibility === ItemVisibility.PRIVATE && "bg-purple-50/50 border-purple-200 hover:border-purple-300 border-2 dark:bg-purple-900/20 dark:border-purple-800/20",
        present.visibility === ItemVisibility.PRIVATE && present.status === ItemStatus.DRAFT && "bg-stripe-private-draft border-dashed border-1"
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Gift className="h-5 w-5 text-primary" />
              {present.name}
              {present.visibility === ItemVisibility.PRIVATE && (
                <Lock className="h-4 w-4 text-purple-500" />
              )}
            </CardTitle>
            {present.list && (
              <div className="flex items-center text-muted-foreground">
                <ListTodo className="mr-2 h-4 w-4" />
                Lista: {present.list.name}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Badge
              variant="outline"
              className={cn("border flex items-center gap-1", statusStyles[present.status])}
            >
              <StatusIcon className="h-3 w-3" />
              {present.status === ItemStatus.DRAFT
                ? "Borrador"
                : present.status === ItemStatus.PUBLISHED
                ? "Publicado"
                : "Archivado"}
            </Badge>
            <Badge
              variant="outline"
              className={cn("border flex items-center gap-1", visibilityStyles[present.visibility])}
            >
              <VisibilityIcon className="h-3 w-3" />
              {present.visibility === ItemVisibility.PUBLIC ? "Público" : "Privado"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col space-y-4">
          {present.description && (
            <p className="text-sm text-muted-foreground">{present.description}</p>
          )}

          {present.externalLink && (
            <a
              href={present.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary flex items-center hover:underline"
            >
              <LinkIcon className="h-3 w-3 mr-1" />
              {getDomainFromUrl(present.externalLink)}
            </a>
          )}

          <div className="text-xs text-muted-foreground space-y-1">
            <p className="flex items-center">
              <ClockIcon className="h-3 w-3 mr-1" />
              <span className="font-medium">Creado:</span>
              &nbsp;
              {format(present.createdAt, "PPP 'a las' HH:mm", { locale: es })}
            </p>
            <p className="flex items-center">
              <ClockIcon className="h-3 w-3 mr-1" />
              <span className="font-medium">Modificado:</span>
              &nbsp;
              {format(present.updatedAt, "PPP 'a las' HH:mm", { locale: es })}
            </p>
          </div>

          <div className="flex gap-2 pt-2 justify-end">
            <Button variant="default" size="sm" asChild>
              <Link to="/dashboard/presents/$presentId/edit" params={{ presentId: present.id }}>
                Ver detalles
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/presents/$presentId/edit" params={{ presentId: present.id }}>
                Editar
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
