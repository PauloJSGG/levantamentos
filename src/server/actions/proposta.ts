"use server";
import { revalidatePath } from "next/cache";
import { api } from "~/trpc/server";
import { FormState, toFormState } from "~/utils/to-form-state";

export const create = async (formState: FormState, formData: FormData) => {
  try {
    await api.proposta.create({
      id: formData.get("id") as string,
    });
  } catch (error) {
    return toFormState("ERROR", "Ocorreu um erro ao criar a proposta.");
  }

  revalidatePath("/propostas/novo");
  return toFormState("SUCCESS", "Proposta criada com sucesso.");
};
