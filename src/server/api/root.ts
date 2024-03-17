import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { espacoRouter } from "./routers/espaco";
import { propostaRouter } from "./routers/proposta";
import { edificioRouter } from "./routers/edificio";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  espaco: espacoRouter,
  proposta: propostaRouter,
  edificio: edificioRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
