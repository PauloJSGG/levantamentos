import Link from "next/link";
import PropostaForm from "~/components/forms/proposta";
import { create } from "~/server/actions/proposta";
import { api } from "~/trpc/server";

export default async function Propostas() {
  const propostas = await api.proposta.getAll();

  return (
    <div className="container mx-auto gap-2 flex flex-col">
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
                <td className="border-b px-4 py-2">
                  {proposta.criadoPor.name}
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
      <Link
        href="/propostas/novo" 
        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 text-center"
        >
        Criar nova proposta
      </Link>
    </div>
  );
}
