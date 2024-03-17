import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { getServerAuthSession } from "~/server/auth";

export const espacoRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ propostaId: z.string().min(1) }))
    .input(z.object({ descricao: z.string().min(1) }))
    .input(z.object({ designacao: z.string().min(1) }))
    .input(
      z.object({
        fotosEspaco: z
          .array(
            z.object({
              caminhoRelativo: z.string().min(1),
              tipo: z.enum(["Espaco", "Iluminacao", "Equipamento"]),
            }),
          )
          .optional()
          .transform((val) => (!val ? [] : val)),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.espaco.create({
        data: {
          designacao: input.designacao,
          fotosEspaco: {
            createMany: {
              data: input.fotosEspaco,
            },
          },
        },
      });
    }),

  get: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.espaco.findUnique({
        where: { id: input.id },
      });
    }),
});
