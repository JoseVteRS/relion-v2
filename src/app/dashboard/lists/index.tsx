import { ListSections } from "@/modules/lists/ui/sections/list-sections";
import { ListsView } from "@/modules/lists/ui/views/lists-create-view";
import { seo } from "@/utils/seo";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/lists/")({
  component: RouteComponent,
  head: (ctx) => ({
    meta: [
      ...seo({
        title: "Mis listas",
        description: "Mis listas de regalos",
      }),
    ],
  }),
});

function RouteComponent() {
  return <ListsView />;
}
