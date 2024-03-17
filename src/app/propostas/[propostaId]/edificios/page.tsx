"use server";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { create } from "~/server/actions/edificio";
// import React, { useState } from 'react';
// import Modal from '~/app/_components/modal';
import { api } from "~/trpc/server";

export default async function EdificioNovo ({ params }: { params: { propostaId: string } }) {

  const edificios = await api.edificio.getWithEspacos({ propostaId: params.propostaId })

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Edificios:</h2>
      <table className="min-w-full bg-white border border-gray-300 table-auto">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Id</th>
            <th className="py-2 px-4 border-b">Designação</th>
            <th className="py-2 px-4 border-b">Descrição</th>
            <th className="py-2 px-4 border-b">Espaços</th>
          </tr>
        </thead>
        <tbody>
          {edificios.map((edificio) => (
            <>
              <tr key={edificio.id}>
                <td className="py-2 px-4 border-b">
                  <Link
                    href={`/propostas/${params.propostaId}/edificios/${edificio.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {edificio.id}
                  </Link>
                </td>
                <td className="py-2 px-4 border-b">
                  {edificio.designacao}
                </td>
                <td className="py-2 px-4 border-b">
                  {edificio.designacao}
                </td>
                <td className="py-2 px-4 border-b">
                {edificio.espacos.map((espaco) => (
                <li key={edificio.id}>
                  <Link
                    href={`/propostas/${espaco.propostaId}/edificios/${edificio.id}/espacos/${espaco.id}`}
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
                Novo Espaço
              </Link>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
      <h2 className="text-2xl font-semibold mb-4">Criar edificio:</h2>
      <form action={create}>
        <div className="mb-4">
          <label htmlFor="propostaId" className="block text-gray-400 font-bold mb-2">
            Numero da proposta
          </label>
          <input
            type="text"
            id="propostaId"
            // disabled={true}  
            name="propostaId"
            value={params.propostaId}
            readOnly={true}
            className="w-full px-3 py-2 border text-gray-400 cursor-default border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="designacao" className="block text-gray-400 font-bold mb-2">
            Designação
          </label>
          <input
            type="text"
            id="designacao"
            name="designacao"
            defaultValue={''}
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="descricao" className="block text-gray-400 font-bold mb-2">
            Descrição
          </label>
          <input
          type="text"
            id="descricao"
            name="descricao"
            defaultValue={''}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </>
  );
};