"use server";

import { revalidatePath } from "next/cache";
import { api } from "~/trpc/server";
import { FormState } from "~/utils/to-form-state";

export const create = async (formState: FormState, formData: FormData) => {
  await api.edificio.create({
    propostaId: formData.get("propostaId") as string,
    designacao: formData.get("designacao") as string,
    descricao: formData.get("descricao") as string,
  });

  revalidatePath(`/propostas/[propostaId]/edificios/novo`);
};
