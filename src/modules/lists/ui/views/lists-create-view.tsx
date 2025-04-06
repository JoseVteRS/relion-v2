import { DashboardPageLayout } from "@/components/dashboard-page-layout";
import { DashboardPageTitle } from "@/components/dashboard-page-title";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { ListSections } from "../sections/list-sections";
export const ListsView = () => {
  return (
    <DashboardPageLayout>
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <DashboardPageTitle
          title="Mis listas"
          description="Listas de regalos"
        />
        <Button variant="default">
          <Link to="/dashboard/lists/create">
            Crear lista
          </Link>
        </Button>
      </div>
      <ListSections />
    </DashboardPageLayout>
  );
};
