import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

export const createTRPCContext = async ({ headers }: { headers: Headers }) => {
  const session = { user: null };

  return {
    session,
  };
};

export const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;

const enforceUserIsAuthenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(enforceUserIsAuthenticated);
