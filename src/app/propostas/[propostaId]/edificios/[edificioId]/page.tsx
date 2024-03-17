import Link from "next/link";
import { api } from "~/trpc/server";

export default async function EdificioPage ({ params }: { params: { propostaId: string, edificioId: string } }) {
  const edificio = await api.edificio.getFromIdWithEspacos({ id: Number(params.edificioId) });

  if (!edificio) {
    return <div>Edifício não encontrado</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">{`Edifício ${params.edificioId}`}</h1>
      <table className="min-w-full bg-white border border-gray-300 table-auto">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Designação</th>
            <th className="py-2 px-4 border-b">Descrição</th>
            <th className="py-2 px-4 border-b">Espacos</th>
          </tr>
        </thead>
        <tbody>
          <tr key={edificio?.id}>
            <td className="py-2 px-4 border-b">
              {edificio?.id}
            </td>
            <td className="py-2 px-4 border-b">
              {edificio?.designacao}
            </td>
            <td className="py-2 px-4 border-b">
              {edificio?.descricao}
            </td>
            <td className="py-2 px-4 border-b">
              {edificio?.espacos.map((espaco) => (
                <li key={edificio.id}>
                  <Link
                    href={`/propostas/${params.propostaId}/edificios/${edificio.id}/espacos/${espaco.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {edificio.designacao}
                  </Link>
                </li>
              ))}
              <Link
                href={`/propostas/${params.propostaId}/edificios/${edificio.id}/espacos/novo`}
                className="text-blue-500 hover:underline"
              >
                Novo espaço
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}