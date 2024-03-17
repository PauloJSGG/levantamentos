import Link from "next/link";
import { create } from "~/server/actions/proposta";
import { api } from "~/trpc/server";

export default async function Propostas () {
  const propostas = await api.proposta.getAll();

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Propostas:</h1>
      <table className="min-w-full bg-white border border-gray-300 table-auto">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Criado por</th>
          </tr>
        </thead>
        <tbody>
          {propostas.map((proposta) => (
            <>
              <tr key={proposta.id}>
                <td className="py-2 px-4 border-b">
                  <Link
                    href={`/propostas/${proposta.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {proposta.id}
                  </Link>
                </td>
                <td className="py-2 px-4 border-b">
                  {proposta.criadoPor.name}
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>

      <form action={create} className="mt-4">
        <div className="mb-4">
          <label htmlFor="titulo" className="block text-gray-400 font-bold mb-2">
            ID:
          </label>
          <input
            type="text"
            id="id"
            placeholder="PXXXX.XXXX"
            pattern="^P[0-9]{4}\.[0-9]{4}$"
            name="id"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Adicionar proposta
        </button>
      </form>
    </div>
  );
};
