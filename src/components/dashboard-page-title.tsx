interface DashboardPageTitleProps {
  title: string;
  description: string;
}

export const DashboardPageTitle = ({
  title,
  description,
}: DashboardPageTitleProps) => {
  return (
    <header>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </header>
  );
};
