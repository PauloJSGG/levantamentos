export default function Registar() {


  return (
    <form>
      <div className="flex flex-col">
        <label htmlFor="name" className="text-sm">Nome</label>
        <input type="text" name="name" id="name" className="border border-gray-300 rounded-md" />
      </div>


      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm">Email</label>
        <input type="text" name="email" id="email" className="border border-gray-300 rounded-md" />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="text-sm">Password</label>
        <input type="password" name="password" id="password" className="border border-gray-300 rounded-md" />
      </div>
    </form>
  )
}