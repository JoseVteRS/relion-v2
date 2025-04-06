import { Navbar } from "@/components/navbar";
import { NavbarDashboard } from "@/components/navbar-dashboard";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { signOut, useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { GiftIcon, ListIcon, SettingsIcon } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/auth/signin" });
    }
  },
  loader: ({ context }) => {
    return { user: context.user };
  },
  component: DashboardLayout,
});

const DASHBOARD_LINKS = [
  {
    title: "MIS COSAS",
    links: [
      {
        to: "/dashboard/presents",
        label: "Mis regalos",
        icon: GiftIcon,
        auth: true,
        isActive: true,
      },
      {
        to: "/dashboard/lists",
        label: "Mis listas",
        icon: ListIcon,
        auth: true,
        isActive: true,
      },
    ],
  },
  {
    title: "LISTAS FAVORITAS",
    links: [
      {
        to: "/dashboard/favorite-lists",
        label: "Mis listas favoritas",
        icon: ListIcon,
        auth: true,
        isActive: false,
      },
    ],
  },
];

function DashboardLayout() {
  const { user } = Route.useLoaderData();

  return (
    <section className="">
      {user ? <NavbarDashboard user={user} /> : <Navbar />}
      <main className="max-w-screen-xl mx-auto flex">
        <aside className="flex flex-col items-start justify-between gap-6 w-72 min-h-screen p-4 border-r">
          <div className="w-full">
            {DASHBOARD_LINKS.map((section) => (
              <div key={section.title} className="w-full mb-8 last:mb-0">
                <h3 className="text-xs font-semibold text-muted-foreground mb-2 px-4">
                  {section.title}
                </h3>
                <div className="flex flex-col gap-1 w-full">
                  {section.links.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={cn(
                        "w-full flex items-center px-4 py-2.5 rounded-md hover:bg-muted transition-colors group",
                        !link.isActive &&
                          "opacity-50 cursor-not-allowed hover:bg-transparent select-none"
                      )}
                      activeProps={{
                        className: "bg-muted text-primary font-medium",
                      }}
                      disabled={!link.isActive}
                    >
                      <link.icon className="size-4 mr-3 text-muted-foreground group-hover:text-primary" />
                      <div className="flex flex-col w-full">
                        <span className="text-sm">{link.label}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>


          <div className="border-t pb-4 w-full">
            <Link to="/dashboard/settings" className="flex items-center px-4 py-2.5 rounded-md hover:bg-muted transition-colors group w-full">
              <SettingsIcon className="size-4 mr-3 text-muted-foreground group-hover:text-primary" />
              Configuración
            </Link>
          </div>
        </aside>
        <section className="flex-1 p-4">
          <Outlet />
        </section>
      </main>
    </section>
  );
}
