import { useTRPC } from "@/trpc/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { PresentEditForm } from "../components/present-edit-form";

export const PresentEditSection = () => {
  const params = useParams({ from: "/dashboard/presents/$presentId/edit" });
  const trpc = useTRPC();
  const present = useSuspenseQuery(
    trpc.present.getByIdWithList.queryOptions({
      id: params.presentId,
    })
  );

  return (
    <div>
      <h2 className="text-xl font-bold">Editar regalo</h2>
      <PresentEditForm present={present.data} />
    </div>
  );
};
