import { ItemStatus, ItemVisibility } from "@prisma/client";
import { z } from "zod";

export const presentCreateSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  externalLink: z.string().optional(),
  listId: z.string().nullable(),
  status: z.nativeEnum(ItemStatus),
  visibility: z.nativeEnum(ItemVisibility),
});
