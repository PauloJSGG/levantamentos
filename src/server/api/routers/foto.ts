import { create } from "domain";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { getServerAuthSession } from "~/server/auth";

export const fotoRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ edificio_id: z.number() }).optional())
    .input(z.object({ elevadores_id: z.number() }).optional())
    .input(z.object({ espaco_id: z.number() }).optional())
    .input(z.object({ tipo_sistemas_id: z.number() }).optional())
    .input(
      z.object({
        fotos: z
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
      return ctx.db.foto.create({
        data: {
          edificio_id: input.edificio_id,
          elevadores_id: input.elevadores_id,
          espaco_id: input.espaco_id,
          tipo_sistemas_id: input.tipo_sistemas_id,
          createMany: {
            data: input.fotos,
          },
        },
      });
    }),

  // get: protectedProcedure
  //   .input(z.object({ id: z.number() }))
  //   .query(async ({ input, ctx }) => {
  //     return ctx.db.foto.findUnique({
  //       where: { id: input.id },
  //     });
  //   }),
});
