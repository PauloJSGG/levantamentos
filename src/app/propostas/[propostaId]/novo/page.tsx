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
        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Criar espaço
      </Link>
    );
  }
  return (
    <button disabled className="rounded-md bg-gray-500 px-4 py-2 text-white">
      Criar espaço
    </button>
  );
};

export default async function PropostaNova({
  params,
}: {
  params: { propostaId: string };
}) {
  const proposta = await api.proposta.getWithEdificios({
    id: params.propostaId,
  });
  const edit = (formData: FormData) => {
    "use server";
    // api.post
    // Add your form submission logic here
  };
  const numberOfEdificios = proposta?.edificios?.length;

  if (!proposta) {
    return (
      <div className="flex h-full items-center justify-center">
        Proposta não encontrada
      </div>
    );
  }

  return (
    <>
      <div className="flex h-full items-center justify-center">
        <label htmlFor="name" className="mb-2 block font-bold text-gray-700">
          Numero da proposta
        </label>
        <input
          type="text"
          id="name"
          disabled={true}
          name="name"
          value={proposta?.id}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-between">
        <Link
          href={`./${params.propostaId}/edificios/novo`}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Criar edificio
        </Link>
        {canNewEspaco(numberOfEdificios, params.propostaId)}
      </div>
    </>
  );
}
