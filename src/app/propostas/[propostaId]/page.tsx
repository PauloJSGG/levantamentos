"use server";
import Link from "next/link";
import { api } from "~/trpc/server";

export default async function Proposta ({ params }: { params: { propostaId: string } }) {
  const proposta = await api.proposta.getAllWithEdificiosAndEspacos({ id: params.propostaId })


  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Proposta</h1>
        <table className="min-w-full bg-white border border-gray-300 table-auto">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Criado por</th>
            <th className="py-2 px-4 border-b">Edificios</th>
          </tr>
        </thead>
        <tbody>
          <tr key={proposta?.id}>
            <td className="py-2 px-4 border-b">
              {proposta?.id}
            </td>
            <td className="py-2 px-4 border-b">
              {proposta?.criadoPor.name}
            </td>
            <td className="py-2 px-4 border-b">
              {proposta?.edificios.map((edificio) => (
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
                href={`/propostas/${proposta?.id}/edificios`}
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
};