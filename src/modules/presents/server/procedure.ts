import { prisma } from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { PickedStatus, Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { PresentStatus } from "../schemas";
import { presentCreateSchema } from "../schemas/present-create-schema";

const presentEditSchema = presentCreateSchema.partial().extend({ id: z.string() });

export const presentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(presentCreateSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { success, data } = presentCreateSchema.safeParse(input);

        if (!success) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "[presentRouter.create] Datos inválidos",
          });
        }

        const present = await prisma.present.create({
          data: {
            ...data,
            ownerId: ctx.session.user.id,
          },
        });

        if (!present) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "[presentRouter.create] Error al crear el regalo",
          });
        }

        return present;
      } catch (error) {
        console.error("[presentRouter.create] Error al crear el regalo", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "[presentRouter.create] Error al crear el regalo",
        });
      }
    }),
  get: protectedProcedure.query(async ({ ctx }) => {
    try {
      const presents = await prisma.present.findMany({
        where: {
          ownerId: ctx.session.user.id,
        },
        include: {
          list: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (!presents) {
        console.error("[presentRouter.get] No se encontraron regalos");
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "[presentRouter.get] No se encontraron regalos",
        });
      }

      return presents;
    } catch (error) {
      console.error("[presentRouter.get] Error al obtener los regalos", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "[presentRouter.get] Error al obtener los regalos",
      });
    }
  }),
  getByIdWithList: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const present = await prisma.present.findUnique({
        where: { id: input.id, ownerId: ctx.session.user.id },
        include: { list: true },
      });

      if (!present) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "[presentRouter.getByIdWithList] Regalo no encontrado",
        });
      }

      return present;
    }),
  edit: protectedProcedure
    .input(presentEditSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { success, data: dataInput } = presentEditSchema.safeParse(input);

        if (!success) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "[presentRouter.edit] Datos inválidos",
          });
        }

        const present = await prisma.present.update({
          where: {
            id: input.id,
            ownerId: ctx.session.user.id,
          },
          data: {
            ...dataInput,
          },
        });

        if (!present) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "[presentRouter.edit] Regalo no encontrado",
          });
        }

        return present;
      } catch (error) {
        console.error("[presentRouter.edit] Error al editar el regalo", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "[presentRouter.edit] Error al editar el regalo",
        });
      }
    }),

  /**
   * Pick a present
   */
  pick: protectedProcedure
    .input(z.object({ presentId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { presentId } = input;
      
      const present = await prisma.present.findUnique({
        where: { id: presentId },
      });

      if (!present) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Regalo no encontrado",
        });
      }

      // Verificar si el regalo ya está marcado
      if (present.pickedStatus !== PickedStatus.UNPICKED) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Este regalo ya ha sido elegido",
        });
      }

      // Marcar el regalo con el ID del usuario autenticado
      const updatedPresent = await prisma.present.update({
        where: { id: presentId },
        data: {
          pickedStatus: PickedStatus.PICKED,
          pickedAt: new Date(),
          pickedByUserId: ctx.session.user.id,
        },
      });
      
      return updatedPresent;
    }),

  /**
   * Unpick a present
   */
  unpick: protectedProcedure
    .input(z.object({ presentId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { presentId } = input;
      
      const present = await prisma.present.findUnique({
        where: { id: presentId },
      });

      if (!present) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Regalo no encontrado",
        });
      }

      // Verificar permisos
      if (present.pickedByUserId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "No tienes permiso para desmarcar este regalo",
        });
      }

      const updatedPresent = await prisma.present.update({
        where: { id: presentId },
        data: {
          pickedStatus: PickedStatus.UNPICKED,
          pickedAt: null,
          pickedByUserId: null,
        },
      });

      return updatedPresent;
    }),

  /**
   * Mark a present as bought
   */
  markAsBought: protectedProcedure
    .input(z.object({ presentId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { presentId } = input;
      
      const present = await prisma.present.findUnique({
        where: { id: presentId },
      });

      if (!present) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Regalo no encontrado",
        });
      }

      // Verificar que el regalo esté marcado como picked
      if (present.pickedStatus !== PickedStatus.PICKED) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "El regalo debe estar marcado como elegido antes de marcarlo como comprado",
        });
      }

      // Verificar permisos
      if (present.pickedByUserId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "No tienes permiso para marcar este regalo como comprado",
        });
      }

      const updatedPresent = await prisma.present.update({
        where: { id: presentId },
        data: {
          pickedStatus: PickedStatus.BOUGHT,
        },
      });

      return updatedPresent;
    })
});
