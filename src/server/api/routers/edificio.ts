import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { getServerAuthSession } from "~/server/auth";

export const edificioRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ propostaId: z.string().min(1) }))
    .input(z.object({ descricao: z.string().min(1) }))
    .input(z.object({ designacao: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.edificio.create({
        data: {
          propostaId: input.propostaId,
          designacao: input.designacao,
          descricao: input.descricao,
        },
      });
    }),

  getFromIdWithEspacos: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.edificio.findUnique({
        where: { id: input.id },
        include: { espacos: true },
      });
    }),

  getWithEspacos: protectedProcedure
    .input(z.object({ propostaId: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.edificio.findMany({
        where: { propostaId: input.propostaId },
        include: { espacos: true },
      });
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.edificio.findUnique({
        where: { id: input.id },
      });
    }),
});
