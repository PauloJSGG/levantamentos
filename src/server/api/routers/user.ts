
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { getServerAuthSession } from "~/server/auth";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({
      name: z.string(),
      // email with regex validation
      email: z.string().email(),
      // password with length validation
      password: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      // const session = await getServerAuthSessio  n()
      return ctx.db.user.create({
        data: {
          email: input.email,
          name: input.name,
          password: input.password,
        },
      });
    }),

    getByEmail: publicProcedure
    .input(z.object({
      email: z.string().email(),
    }))
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      });
    }),

    getUserByEmail: publicProcedure
    .input(z.object({
      email: z.string().email(),
    }))
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      });
    }),

})