import Link from "next/link";
import { api } from "~/trpc/server";

export default async function EdificioPage({
  params,
}: {
  params: { propostaId: string; edificioId: string };
}) {
  const edificio = await api.edificio.getFromIdWithEspacos({
    id: Number(params.edificioId),
  });

  if (!edificio) {
    return <div>Edifício não encontrado</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="mb-4 text-2xl font-bold">{`Edifício ${params.edificioId}`}</h1>
      <table className="min-w-full table-auto border border-gray-300 bg-white">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">ID</th>
            <th className="border-b px-4 py-2">Designação</th>
            <th className="border-b px-4 py-2">Descrição</th>
            <th className="border-b px-4 py-2">Espacos</th>
          </tr>
        </thead>
        <tbody>
          <tr key={edificio?.id}>
            <td className="border-b px-4 py-2">{edificio?.id}</td>
            <td className="border-b px-4 py-2">{edificio?.designacao}</td>
            <td className="border-b px-4 py-2">{edificio?.descricao}</td>
            <td className="border-b px-4 py-2">
              {edificio?.espaco.map((espaco) => (
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
  );
}
