import appCss from "@/app/global.css?url";
import { DefaultCatchBoundary } from "@/components/default-catch-boundary";
import { auth } from "@/lib/auth";
import { AppRouter } from "@/trpc/router";
import { ReactQueryDevtools, TanStackRouterDevtools } from "@/utils/dev-tools";
import { seo } from "@/utils/seo";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { TRPCOptionsProxy } from "@trpc/tanstack-react-query";
import * as React from "react";
import { Toaster } from "sonner";

const getUser = createServerFn({ method: "GET" }).handler(async () => {
  const { headers } = getWebRequest()!;
  const session = await auth.api.getSession({ headers });

  return session?.user || null;
});

function RootComponent() {

  return (
    <RootDocument>
      <div id="root">
        <div
          className="scroll-smooth antialiased"
          id="content"
        >
          <Outlet />
        </div>
      </div>
    </RootDocument>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  trpc: TRPCOptionsProxy<AppRouter>;
  user: Awaited<ReturnType<typeof getUser>>;
}>()({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.fetchQuery({
      queryKey: ["user"],
      queryFn: ({ signal }) => getUser({ signal }),
    }); // we're using react-query for caching, see router.tsx
    return { user };
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      ...seo({
        title: "Relion",
        description: "Que la sorpresa sea el regalo y no tener que devolverlo",
      }),
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      ,
      { rel: "icon", href: "/favicon.svg" },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  component: RootComponent,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="light">
      <head>
        <HeadContent />
      </head>
      <body className="antialiased font-display min-h-[100dvh - 56px]">
        <main>{children}</main>

        <Toaster richColors position="top-right" />

        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />

        <Scripts />
      </body>
    </html>
  );
}
