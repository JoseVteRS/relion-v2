import { DashboardPageLayout } from "@/components/dashboard-page-layout";
import { DashboardPageTitle } from "@/components/dashboard-page-title";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { PresentListSection } from "../sections/present-list-section";
export const PresentsView = () => {
  return (
    <DashboardPageLayout>
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <DashboardPageTitle title="Mis regalos" description="Regalos que tienes pendientes" />
        <Button>
          <Link to="/dashboard/presents/create">Agregar regalo</Link>
        </Button>
      </div>
      <PresentListSection />
    </DashboardPageLayout>
  );
};
