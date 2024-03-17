"use server";
import Link from "next/link";
// import React, { useState } from 'react';
// import Modal from '~/app/_components/modal';
import { api } from "~/trpc/server";

const canNewEspaco = (numOfEdificios: number | undefined, id: string) => {
  if (numOfEdificios) {
    return (
      <Link
        href={`/[propostaId]/espacos/novo`}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Criar espaço
      </Link>
    )
  }
  return (
    <button
      disabled
      className="px-4 py-2 bg-gray-500 text-white rounded-md"
    >
      Criar espaço
    </button>
  )
}

export default async function PropostaNova ({ params }: { params: { propostaId: string } }) {
  const proposta = await api.proposta.getWithEdificios({ id: params.propostaId })
  const edit = (formData: FormData) => {
    'use server'
    // api.post
    // Add your form submission logic here
  };
  const numberOfEdificios = proposta?.edificios?.length

  if (!proposta) {
    return (
      <div
        className="flex items-center justify-center h-full"
      >
        Proposta não encontrada
      </div>
    )

  }

  return (
    <>
        <div
          className="flex items-center justify-center h-full"
        >
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Numero da proposta
          </label>
          <input
            type="text"
            id="name"
            disabled={true}
            name="name"
            value={proposta?.id}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
    <div className="flex justify-between">
      <Link
        href={`./${params.propostaId}/edificios/novo`}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Criar edificio
      </Link>
      {canNewEspaco(numberOfEdificios, params.propostaId)}
    </div>
    </>
  );
};