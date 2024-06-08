import { create } from "domain";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { getServerAuthSession } from "~/server/auth";

export const fotoRouter = createTRPCRouter({
  createMany: protectedProcedure
    // .input(z.object({ edificio_id: z.number() }).optional())
    // .input(z.object({ elevadores_id: z.number() }).optional())
    // .input(z.object({ espaco_id: z.number() }).optional())
    // .input(z.object({ tipo_sistemas_id: z.number() }).optional())
    // .input(
    //   z.object({
    //     fotos: z
    //       .array(
    //         z.object({
    //           caminhoRelativo: z.string().min(1),
    //           tipo: z.enum(["Espaco", "Iluminacao", "Equipamento"]),
    //         }),
    //       )
    //       .optional()
    //       .transform((val) => (!val ? [] : val)),
    //   }),
    // )
    .mutation(async ({ ctx, input }) => {
      const test = [
        {
          edificio_id: 2,
          elevadores_id: 2,
          espaco_id: 2,
          tipo_sistemas_id: 2,
          caminhoRelativo: "test",
          tipo: "test",
        },
      ];
      return ctx.db.foto.createMany({
        data: test,
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
