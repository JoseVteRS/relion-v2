import { Navbar } from "@/components/navbar";
import { NavbarDashboard } from "@/components/navbar-dashboard";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: ({ context }) => {
    return { user: context.user };
  },
});

function RouteComponent() {
  const { queryClient } = Route.useRouteContext();
  const { user } = Route.useLoaderData();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 p-6">

      {user ? <NavbarDashboard user={user} /> : <Navbar />}
      
      <h1 className="text-4xl font-bold">React TanStarter</h1>
      <div className="flex items-center gap-2">
        This is an unprotected page:
        <pre className="bg-card text-card-foreground rounded-md border p-1">
          routes/index.tsx
        </pre>
      </div>

      {user ? (
        <div className="flex flex-col gap-2">
          <p>Welcome back, {user.name}!</p>
          <Button type="button" asChild className="w-fit" size="lg">
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
          <div>
            More data:
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>

          <Button
            onClick={async () => {
              await signOut();
              await queryClient.invalidateQueries({ queryKey: ["user"] });
              await router.invalidate();
            }}
            type="button"
            className="w-fit"
            variant="destructive"
            size="lg"
          >
            Sign out
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <p>You are not signed in.</p>
          <Button type="button" asChild className="w-fit" size="lg">
            <Link to="/auth/signin">Sign in</Link>
          </Button>
        </div>
      )}

      {/* <ThemeToggle /> */}

      <a
        className="text-muted-foreground hover:text-foreground underline"
        href="https://github.com/dotnize/react-tanstarter"
        target="_blank"
        rel="noreferrer noopener"
      >
        dotnize/react-tanstarter
      </a>
    </div>
  );
}
