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
    .input(z.object({ descricao: z.string().optional() }))
    .input(z.object({ designacao: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.edificio.create({
        data: {
          proposta_id: input.propostaId,
          designacao: input.designacao === "" ? null : input.designacao,
          descricao: input.descricao === "" ? null : input.descricao,
        },
      });
    }),

  getFromIdWithEspacos: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.edificio.findUnique({
        where: { id: input.id },
        include: { espaco: true },
      });
    }),

  getWithEspacos: protectedProcedure
    .input(z.object({ propostaId: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.edificio.findMany({
        where: { proposta_id: input.propostaId },
        include: { espaco: true },
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
