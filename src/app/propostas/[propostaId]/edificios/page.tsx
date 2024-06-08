"use server";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { create } from "~/server/actions/edificio";
// import React, { useState } from 'react';
// import Modal from '~/app/_components/modal';
import { api } from "~/trpc/server";

export default async function EdificioNovo({
  params,
}: {
  params: { propostaId: string };
}) {
  const edificios = await api.edificio.getWithEspacos({
    propostaId: params.propostaId,
  });

  return (
    <>
      <h2 className="mb-4 text-2xl font-semibold">Edificios:</h2>
      <table className="min-w-full table-auto border border-gray-300 bg-white">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">Id</th>
            <th className="border-b px-4 py-2">Designação</th>
            <th className="border-b px-4 py-2">Descrição</th>
            <th className="border-b px-4 py-2">Espaços</th>
          </tr>
        </thead>
        <tbody>
          {edificios.map((edificio) => (
            <>
              <tr key={edificio.id}>
                <td className="border-b px-4 py-2">
                  <Link
                    href={`/propostas/${params.propostaId}/edificios/${edificio.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {edificio.id}
                  </Link>
                </td>
                <td className="border-b px-4 py-2">{edificio.designacao}</td>
                <td className="border-b px-4 py-2">{edificio.designacao}</td>
                <td className="border-b px-4 py-2">
                  {edificio.espaco.map((espaco) => (
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
                    Novo Espaço
                  </Link>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
      <h2 className="mb-4 text-2xl font-semibold">Criar edificio:</h2>
      {/* <form action={create}>
        <div className="mb-4">
          <label
            htmlFor="propostaId"
            className="mb-2 block font-bold text-gray-400"
          >
            Numero da proposta
          </label>
          <input
            type="text"
            id="propostaId"
            // disabled={true}
            name="propostaId"
            value={params.propostaId}
            readOnly={true}
            className="w-full cursor-default rounded-md border border-gray-300 px-3 py-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="designacao"
            className="mb-2 block font-bold text-gray-400"
          >
            Designação
          </label>
          <input
            type="text"
            id="designacao"
            name="designacao"
            defaultValue={""}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="descricao"
            className="mb-2 block font-bold text-gray-400"
          >
            Descrição
          </label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            defaultValue={""}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Submit
        </button>
      </form> */}
    </>
  );
}
