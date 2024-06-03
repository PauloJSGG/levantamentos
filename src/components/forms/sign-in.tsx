"use client";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <button
      className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      onClick={() => signIn()}
    >
      Entrar
    </button>
  );
}
