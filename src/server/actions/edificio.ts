"use server";

import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import { mkdirp } from "mkdirp";
import { api } from "~/trpc/server";
import path from "path";
import { FormState, toFormState } from "~/utils/to-form-state";

export const create = async (formState: FormState, formData: FormData) => {
  try {
    const edificio = await api.edificio.create({
      propostaId: formData.get("propostaId") as string,
      designacao: formData.get("designacao") as string,
      descricao: formData.get("descricao") as string,
    });

    const fotos = formData.getAll("fotos") as File[];
    const arrayOfFilePaths = [];
    const folderPath = path.join(
      process.cwd(),
      `public/uploads/edificio/${edificio.id}`,
    );
    await mkdirp(folderPath);
    for (const foto of fotos) {
      const buffer = Buffer.from(await foto.arrayBuffer());
      const fileName = `${Date.now()}-${foto.name}`;
      const filePath = folderPath + fileName;
      arrayOfFilePaths.push(filePath);
      await writeFile(filePath, buffer);
    }

    await api.foto.create({
      edificio_id: edificio.id,
      fotos: arrayOfFilePaths.map((filePath) => ({
        caminhoRelativo: filePath,
        tipo: "Edificio",
      })),
    });
  } catch (error) {
    return toFormState("ERROR", "Erro ao criar edifício");
  }

  return toFormState("SUCCESS", "Edifício criado");
};
