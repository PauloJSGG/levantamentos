import { create } from "~/server/actions/user";

export default async function Registar() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen dark:bg-slate-600">
      <form action={create} className="w-1/2">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-400 font-bold mb-2">
            Nome:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-400 font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-400 font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submeter
        </button>
      </form>
    </div>
  )

}