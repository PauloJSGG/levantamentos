import { revalidatePath } from "next/cache";
import { api } from "~/trpc/server";

export const create = async (formData: FormData) => {
  'use server'
  await api.edificio.create({
    propostaId: formData.get("propostaId") as string,
    designacao: formData.get("designacao") as string,
    descricao: formData.get("descricao") as string,
  })

  revalidatePath(`/propostas/[propostaId]/edificios/novo`)
};