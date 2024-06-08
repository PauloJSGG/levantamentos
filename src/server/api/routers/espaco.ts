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
          numero: 1,
          pe_direito: 1,
          climatizado: 3,
          util: 1,
          foto: {
            createMany: {
              data: input.fotosEspaco,
            },
          },
          edificio_id: 1,
          piso_id: 1,
          ocupacao_id: 1,
          iluminacao_id: 1,
          envidracados_id: 1,
          sistemas_id: 1,
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
