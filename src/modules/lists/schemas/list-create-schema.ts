import { ItemStatus, ItemVisibility } from "@prisma/client";
import { z } from "zod";

export const listCreateSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  status: z.nativeEnum(ItemStatus),
  visibility: z.nativeEnum(ItemVisibility),
  eventDate: z.date(),
});
