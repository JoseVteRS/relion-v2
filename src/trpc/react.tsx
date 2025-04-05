import { AppRouter } from "@/trpc/router";
import { createTRPCContext } from "@trpc/tanstack-react-query";



export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();