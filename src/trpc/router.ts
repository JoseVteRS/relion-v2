import { postsRouter } from "@/modules/posts/server/procedure";
import { createTRPCRouter } from "@/trpc/init";

export const appRouter = createTRPCRouter({
  posts: postsRouter,
});

export type AppRouter = typeof appRouter;