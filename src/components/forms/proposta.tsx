'use client'

import { useState } from "react";
import { create } from "~/server/actions/proposta"

export default function PropostaForm() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const res = await create(data);
    if (res?.error) {
      setError(res?.error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2">
      <input
        type="text"
        id="id"
        name="id"
        placeholder="PXXXX.XXXX"
        className="border border-gray-300 rounded-md text-black h-12"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Nova proposta
      </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}