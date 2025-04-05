// This _app component functions as a layout component that wraps all authenticated routes in the app. It is a good place to put things like a header, footer, or sidebar that you want to appear on every page of your app.
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useRouter,
} from "@tanstack/react-router";

import { Button } from "@/components/button";
import { Logo } from "@/components/logo";
export const Route = createFileRoute("/_app")({
  component: LayoutComponent,
});

function Header() {
  const router = useRouter();

  return (
    <header className="px-6 py-4 bg-white/50 dark:bg-[--color-dark]/50 backdrop-blur-sm border-b border-primary/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 w-full">
        <Link 
          className="font-primary text-[--color-secondary] dark:text-[--color-light] hover:opacity-80 transition-opacity" 
          to="/"
        >
          <Logo />
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            className="font-primary text-[--color-secondary] dark:text-[--color-light] hover:text-primary dark:hover:text-primary transition-colors"
            activeProps={{ className: "text-primary font-semibold" }}
            to="/posts"
          >
            Posts
          </Link>
          <Button
            type="button"
            onClick={() => {
              router.navigate({ to: "/auth/sign-in" });
            }}
          >
            Sign out
          </Button>
        </nav>
      </div>
    </header>
  );
}

// This layout component is a simple layout that includes a header and a main content area. The main content area is where the child routes will be rendered.
function LayoutComponent() {
  return (
    <div className="flex flex-col min-h-screen bg-[--color-light] dark:bg-[--color-dark]">
      <Header />
      <main className="flex-1 px-6 py-8">
        <div className="max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
