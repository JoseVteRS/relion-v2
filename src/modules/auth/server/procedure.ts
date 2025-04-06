import { signUp } from "@/lib/auth-client";
import { createTRPCRouter, publicProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(1),
});

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input }) => {
      const { success, data } = registerSchema.safeParse(input);
      if (!success) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid input",
        });
      }

      const user = await signUp.email(
        {
          email: data.email,
          password: data.password,
          name: data.username,
          callbackURL: "/dashboard",
        },
        {
          onSuccess: (ctx) => {
            console.log(ctx);
          },
          onError: (ctx) => {
            console.log(ctx);
          },
        }
      );
      return user;
    }),
});
