"use server";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import { getServerAuthSession } from "../auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

interface Credentials {
  name: string;
  email: string;
  password: string;
}

export const create = async (credentials: FormData) => {
  "use server";
  const session = await getServerAuthSession();
  if (session) {
    return;
  }
  try {
    const name = credentials.get("name") as string;
    const email = credentials.get("email") as string;
    const password = credentials.get("password") as string;
    const hashedPassword = await bcrypt.hash(password, 12);

    await api.user.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    revalidatePath("/");
    return { error: "Erro ao criar proposta" };
  }
  redirect(`/api/auth/signin`);
};

export const login = async (data: FormData) => {
  const email = data.get("email") as string;
  const password = data.get("password") as string;

  const login = await fetch("/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  if (login.ok) {
    redirect("/");
  } else {
    revalidatePath("/");
    return { error: "Erro ao iniciar sessão" };
  }
};

function sha256(string: string) {
  throw new Error("Function not implemented.");
}
