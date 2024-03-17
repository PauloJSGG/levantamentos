import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { getServerAuthSession } from "~/server/auth";

export const propostaRouter = createTRPCRouter({
    create: protectedProcedure
    .input(z.object({ id: z.string().regex(/^P[0-9]{4}\.[0-9]{4}$/, 'Text deve respeitar o formato PXXXX.XXXX') }))
    .mutation(async ({ ctx, input }) => {
      const session = await getServerAuthSession()
      return ctx.db.proposta.create({
        data: {
          id: input.id,
          criadoPor: { connect: { id: session?.user.id } },
        },
      });
    }),

    get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.proposta.findUnique({
        where: { id: input.id },
      });
    }),

    // getAllWithPaginate
    // getAllWithPaginate: protectedProcedure
    // .input(z.object({ skip: z.number() }))
    // .input(z.object({ take: z.number() }))
    // .query(async ({ input, ctx }) => {
    //   return ctx.db.proposta.findMany({
    //     skip: input.skip,
    //     take: input.take,
    //   });
    // }),

    getAll: protectedProcedure
    .query(async ({ ctx }) => {
      return ctx.db.proposta.findMany({
        include: { criadoPor: true },
      });
    }),

    getAllWithEdificiosAndEspacos: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.proposta.findFirst({
        where: { id: input.id },
        include: { edificios: { include: { espacos: true } }, criadoPor: true},
      });
    }),


    getWithEdificios: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.proposta.findFirst({
        where: { id: input.id },
        include: { edificios: true },
      });
    }),

})