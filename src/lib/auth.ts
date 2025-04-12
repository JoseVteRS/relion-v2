import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { jwt } from "better-auth/plugins/jwt";

const prisma = new PrismaClient();
export const auth = betterAuth({
  // plugins: [
  //   jwt({
  //     jwt: {
  //       audience: "http://localhost:3000",
  //       issuer: "http://localhost:3000",
  //       definePayload: ({ user, session }) => {
  //         return {
  //           id: user.id,
  //           email: user.email,
  //           role: user.role,
  //           session: session.token,
  //         };
  //       },
  //     },
  //   }),
  // ],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 * 60 * 24 * 30, // 30 days
    },
    updateAge: 5 * 60, // 5 minutes

  },
  rateLimit: {
    enabled: true,
    limit: 10,
    window: 60 * 1000,
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    signInRedirect: "/dashboard",
    signUpRedirect: "/dashboard",
    autoSignIn: true,

  },
});
