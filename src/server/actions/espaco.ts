"use server";
import { writeFile } from "fs/promises";
import path from "node:path";

import { revalidatePath } from "next/cache";
import { api } from "~/trpc/server";
import { z } from "zod";
import { FormState, toFormState } from "~/utils/to-form-state";

const BASE_PATH = process.cwd();

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// const validateImage = async (file: File) => {

const saveImage = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // const relativePath = `uploads/${file.espacoId}/${file.name}`;
  const relativePath = `uploads/${file.name}`;
  const filePath = `${BASE_PATH}/public/${relativePath}`;

  await writeFile(filePath, buffer);
  return filePath;
};

export const create = async (formState: FormState, formData: FormData) => {
  const fotosEspaco = formData.getAll("fotosEspaco") as File[];

  try {
    const filePaths = await Promise.all(fotosEspaco.map(saveImage));

    await api.espaco.create({
      propostaId: formData.get("propostaId") as string,
      designacao: formData.get("designacao") as string,
      descricao: formData.get("descricao") as string,
      fotosEspaco: filePaths.map((path) => ({
        caminhoRelativo: path,
        tipo: "Espaco",
      })),
    });
  } catch (err) {
    return toFormState("ERROR", "Ocorreu um erro");
  }
  return toFormState("SUCCESS", "Espaço criado");
};
