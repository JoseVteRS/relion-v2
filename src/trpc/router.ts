import { authRouter } from "@/modules/auth/server/procedure";
import { listRouter } from "@/modules/lists/server/procedure";
import { presentRouter } from "@/modules/presents/server/procedure";
import { createTRPCRouter } from "@/trpc/init";



export const appRouter = createTRPCRouter({
  auth: authRouter,
  list: listRouter,
  present: presentRouter,
});

export type AppRouter = typeof appRouter;