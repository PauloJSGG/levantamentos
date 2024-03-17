import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import NavigationPath from "../../components/navigation-path";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Levantamentos",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  return (

    <div className="flex flex-col min-h-screen dark:bg-slate-600">
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center mt-4">
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/propostas"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Propostas
                </Link>
              </li>
              {/* <li>
                      <Link
                        href="/novo-edificio"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Novo Edifício
                      </Link>
                    </li> */}
            </ul>
            <p className="text-center text-m text-white">
              {session && <span>Utilizador: {session.user?.name}</span>}
            </p>
            <div className="flex gap-2">
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {session ? "Terminar sessão" : "Iniciar sessão"}
              </Link>
              {!session && (
                <Link
                  href="/api/auth/signup"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Registar
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>
      <div className="flex w-full justify-center">
        <NavigationPath />
      </div>
      <main
        className="flex flex-col flex-grow max-w-md mx-auto justify-center align-middle items-center"
      >
        {children}
      </main>
    </div>

  )
}
