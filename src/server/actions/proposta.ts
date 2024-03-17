'use server';
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import { getServerAuthSession } from "../auth";
import { revalidatePath } from "next/cache";

export const create = async (data: FormData) => {
    const session = await getServerAuthSession();
    if (!session) {
        return;
    }
    try {
        const id = data.get("id") as string;
        await api.proposta.create({
            id: id,
        });
        // redirect(`/propostas/${id}`);
    }
    catch (error) {
        return { error: 'Erro ao criar proposta'};
    }
    revalidatePath('/propostas');
}
 