import { DashboardPageTitle } from "./dashboard-page-title";

interface DashboardPageLayoutProps {
  children: React.ReactNode;
}

export const DashboardPageLayout = ({
  children,
}: DashboardPageLayoutProps) => {
  return (
    <div className="pt-2">
      {children}
    </div>
  );
};
