import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { getServerAuthSession } from "~/server/auth";

export const propostaRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        id: z
          .string()
          .regex(
            /^P[0-9]{4}\.[0-9]{4}$/,
            "Text deve respeitar o formato PXXXX.XXXX",
          ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const session = await getServerAuthSession();
      return ctx.db.proposta.create({
        data: {
          id: input.id,
          data_criacao: new Date(),
          user: { connect: { id: Number(session?.user.id) } },
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
    .input(z.object({ page: z.number() }))
    .query(async ({input,  ctx }) => {
      // findmany with pagination
      return ctx.db.proposta.findMany({
        skip: 5 * (input.page - 1),
        take: 5,
        include: { user: true },
      });
    }),

  getAllWithEdificiosAndEspacos: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.proposta.findFirst({
        where: { id: input.id },
        include: { edificio: { include: { espaco: true } }, user: true },
      });
    }),

  getWithEdificios: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.proposta.findFirst({
        where: { id: input.id },
        include: { edificio: true },
      });
    }),
});
