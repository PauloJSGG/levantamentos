import { getServerAuthSession } from "~/server/auth";

import PropostaForm from "~/components/forms/proposta";
import Link from "next/link";
import SignIn from "../components/forms/sign-in";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <div className="flex h-dvh items-center justify-center dark:bg-slate-600">
      <div>
        {!session ? (
          <>
            <SignIn />
            {/* <Link
          href="/entrar"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Iiniciar sessão
        </Link> */}
            <Link
              href="/registar"
              className="ml-3 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Registar
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/propostas"
              className="ml-3 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Propostas
            </Link>
            <Link
              href="/api/auth/signout"
              className="ml-3 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Terminar sessão
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
