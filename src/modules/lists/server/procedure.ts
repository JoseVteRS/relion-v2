import prisma from "@/lib/db";
import { PresentStatus } from "@/modules/presents/schemas";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/trpc/init";
import { ItemStatus, ItemVisibility } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { listCreateSchema } from "../schemas";

const listEditSchema = listCreateSchema.partial().extend({ id: z.string() });

export const listRouter = createTRPCRouter({
  /**
   * Create a new list
   */
  create: protectedProcedure
    .input(listCreateSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const {
          success,
          data: dataInput,
          error,
        } = listCreateSchema.safeParse(input);
        if (!success) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
          });
        }

        const newList = await prisma.list.create({
          data: { ...dataInput, ownerId: ctx.session.user.id },
        });

        if (!newList) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "[listRouter.create] Error al crear la lista",
          });
        }

        return newList;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "[listRouter.create] Error al crear la lista",
        });
      }
    }),
  /**
   * Get all lists
   */
  get: protectedProcedure.query(async ({ ctx }) => {
    try {
      const lists = await prisma.list.findMany({
        where: {
          ownerId: ctx.session.user.id,
        },
        orderBy: { eventDate: "asc" },
      });

      if (!lists) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "[listRouter.get] No se encontraron listas",
        });
      }

      return lists;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "[listRouter.get] Error al obtener las listas",
      });
    }
  }),
  /**
   * Get a list by id
   */
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const list = await prisma.list.findUnique({
        where: { id: input.id, ownerId: ctx.session.user.id },
      });

      if (!list) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "[listRouter.getById] Lista no encontrada",
        });
      }

      return list;
    }),

  /**
   * Edit a list
   */
  edit: protectedProcedure
    .input(listEditSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const {
          success,
          data: dataInput,
          error,
        } = listEditSchema.safeParse(input);
        if (!success) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
          });
        }

        const updatedList = await prisma.list.update({
          where: { id: dataInput.id },
          data: dataInput,
        });

        if (!updatedList) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "[listRouter.edit] Error al actualizar la lista",
          });
        }

        return updatedList;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "[listRouter.edit] Error al actualizar la lista",
        });
      }
    }),

  /**
   * Delete a list
   */
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const deletedList = await prisma.list.delete({
        where: { id: input.id },
      });

      if (!deletedList) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "[listRouter.delete] Error al eliminar la lista",
        });
      }
    }),

  /**
   * Get a list by id with presents
   */
  getListByIdWithPresents: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const list = await prisma.list.findUnique({
        where: { id: input.id, ownerId: ctx.session.user.id },
        include: {
          presents: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      if (!list) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "[listRouter.getListByIdWithPresents] Lista no encontrada",
        });
      }

      return list;
    }),

  /**
   * Get a list by id with presents
   */
  getListWithPresentPublic: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const list = await prisma.list.findUnique({
        where: {
          id: input.id,
          status: ItemStatus.PUBLISHED,
          visibility: ItemVisibility.PUBLIC,
          NOT: {
            ownerId: ctx.session?.user.id,
          },
        },
        include: {
          presents: {
            where: {
              status: ItemStatus.PUBLISHED,
              visibility: ItemVisibility.PUBLIC,
            },
            select: {
              id: true,
              name: true,
              description: true,
              externalLink: true,
              pickedStatus: true,
              pickedAt: true,
              pickedBy: {
                select: {
                  name: true,
                  id: true,
                },
              },
              listId: true,
            },
          },
          owner: {
            select: {
              name: true,
            },
          },
        },
      });
      const isOwner = list?.ownerId === ctx.session?.user.id;

      if (isOwner) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message:
            "[listRouter.getListWithPresentPublic] No puedes ver esta lista",
        });
      }

      return list;
    }),
});
