import Link from "next/link";
import PropostaForm from "~/components/forms/proposta";
import { create } from "~/server/actions/proposta";
import { api } from "~/trpc/server";

export default async function Propostas({searchParams}: {searchParams: {page: string}}) {
  const propostas = await api.proposta.getAll({
    page: Number(searchParams.page),
  });

  return (
    <div className="container mx-auto flex flex-col gap-2">
      <h1 className="mb-4 text-2xl font-bold">Propostas:</h1>
      <table className="min-w-full table-auto border border-gray-300 bg-white">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">ID</th>
            <th className="border-b px-4 py-2">Criado por</th>
          </tr>
        </thead>
        <tbody>
          {propostas.map((proposta) => (
            <>
              <tr key={proposta.id}>
                <td className="border-b px-4 py-2">
                  <Link
                    href={`/propostas/${proposta.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {proposta.id}
                  </Link>
                </td>
                <td className="border-b px-4 py-2">{proposta.user.name}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
      {/* pagination */}
      <div className="flex gap-2">
        <Link
          href={`/propostas?page=${Number(searchParams.page) - 1}`}
          className="rounded-md bg-blue-500 px-4 py-2 text-center text-white hover:bg-blue-600"
        >
          Anterior
        </Link>
        <Link
          href={`/propostas?page=${Number(searchParams.page) + 1}`}
          className="rounded-md bg-blue-500 px-4 py-2 text-center text-white hover:bg-blue-600"
        >
          Seguinte
        </Link>
      </div>
      <Link
        href="/propostas/novo"
        className="rounded-md bg-blue-500 px-4 py-2 text-center text-white hover:bg-blue-600"
      >
        Criar nova proposta
      </Link>
    </div>
  );
}
