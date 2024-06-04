"use server";
import Link from "next/link";
import { api } from "~/trpc/server";

export default async function Proposta({
  params,
}: {
  params: { propostaId: string };
}) {
  const proposta = await api.proposta.getAllWithEdificiosAndEspacos({
    id: params.propostaId,
  });

  return (
    <>
      <div className="container mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Proposta</h1>
        <table className="min-w-full table-auto border border-gray-300 bg-white">
          <thead>
            <tr>
              <th className="border-b px-4 py-2">ID</th>
              <th className="border-b px-4 py-2">Criado por</th>
              <th className="border-b px-4 py-2">Edificios</th>
            </tr>
          </thead>
          <tbody>
            <tr key={proposta?.id}>
              <td className="border-b px-4 py-2">{proposta?.id}</td>
              <td className="border-b px-4 py-2">{proposta?.user.name}</td>
              <td className="border-b px-4 py-2">
                {proposta?.edificio.map((edificio) => (
                  <li key={edificio.id}>
                    <Link
                      href={`/propostas/${proposta.id}/edificios/${edificio.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {edificio.designacao}
                    </Link>
                  </li>
                ))}
                <Link
                  href={`/propostas/${proposta?.id}/edificios/novo`}
                  className="text-blue-500 hover:underline"
                >
                  Novo edificio
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
