import { createTRPCRouter, publicProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const POSTS = [
  {
    id: 1,
    title: "Introducción a TanStack Router",
    excerpt: "Aprende los conceptos básicos...",
  },
  {
    id: 2,
    title: "Layouts en TanStack",
    excerpt: "Cómo estructurar tu aplicación...",
  },
  { id: 3, title: "Data Loading", excerpt: "Patrones de carga de datos..." },
  { id: 4, title: "Rutas Dinámicas", excerpt: "Trabajando con parámetros..." },
  {
    id: 5,
    title: "Optimización",
    excerpt: "Mejores prácticas de rendimiento...",
  },
];

const getByIdInputSchema = z.object({
  id: z.number(),
});

export const postsRouter = createTRPCRouter({
  get: publicProcedure.query(async () => {
    return { res: POSTS };
  }),
  getById: publicProcedure
    .input(getByIdInputSchema)
    .query(async ({ input }) => {
      const { success, data, error } = getByIdInputSchema.safeParse(input);

      if (!success) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Invalid input: ${error?.message}`,
        });
      }

      const post = POSTS.find((post) => post.id === Number(input.id));

      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Post with id ${input.id} not found`,
        });
      }

      return post;
    }),
});
