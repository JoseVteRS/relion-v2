import { useTRPC } from "@/trpc/react";
import { useQuery } from "@tanstack/react-query";
import { PresentList } from "../components/present-list";

export const PresentListSection = () => {
  const trpc = useTRPC();
  const {
    data: presents,
    isLoading,
    isError,
  } = useQuery(trpc.present.get.queryOptions());

  return <PresentList presents={presents || []} />;
};
