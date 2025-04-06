import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/react";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import { ListEditForm } from "../components/list-edit-form";
export const ListEditSection = () => {
  const params = useParams({ from: "/dashboard/lists/$listId/edit" });
  const trpc = useTRPC();
  const list = useSuspenseQuery(
    trpc.list.getById.queryOptions({
      id: params.listId,
    })
  );
  const navigate = useNavigate({ from: "/dashboard/lists/$listId/edit" });
  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center gap-2 justify-between">
        <h2 className="text-2xl font-bold">Editando: {list.data?.name}</h2>

        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            navigate({
              to: "/dashboard/lists",
            });
          }}
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </Button>
      </header>
      <ListEditForm list={list.data} />
    </div>
  );
};
