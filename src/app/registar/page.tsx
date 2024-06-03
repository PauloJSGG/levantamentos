import { create } from "~/server/actions/user";

export default async function Registar() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center dark:bg-slate-600">
      <form action={create} className="w-1/2">
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block font-bold text-gray-400">
            Nome:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block font-bold text-gray-400">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block font-bold text-gray-400">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Submeter
        </button>
      </form>
    </div>
  );
}
