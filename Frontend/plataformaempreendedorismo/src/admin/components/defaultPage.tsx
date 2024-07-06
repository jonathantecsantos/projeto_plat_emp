import { ReactNode } from "react"

interface AdminPage {
  mainContent: ReactNode
  title: string
}

export const AdminDefaultPage = ({ mainContent, title }: AdminPage) => {

  const AdminAppBar = () => {
    return <div>
      <p>AdminAppBar</p>
    </div>
  }

  const LeftMenu = () => {
    const backgroundImageUrl = `./src/assets/logo.png`

    return <div>
      <div className="w-full p-4 border-gray-300 border-b">
        <img
          src={backgroundImageUrl}
          className="-z-10 mt-4"
        />
        <h2 className="text-nowrap my-4">Plataforma Empreendedorismo</h2>
      </div>
      <ul className="">
        <li className="p-4 hover:bg-[#509CDB] hover:text-white">Dashboard</li>
        <li className="p-4 hover:bg-[#509CDB] hover:text-white">Teachers</li>
        <li className="p-4 hover:bg-[#509CDB] hover:text-white">Students/Classes</li>
        <li className="p-4 hover:bg-[#509CDB] hover:text-white">Billing</li>
        <li className="p-4 hover:bg-[#509CDB] hover:text-white">Settings and Profile</li>
        <li className="p-4 hover:bg-[#509CDB] hover:text-white">Exams</li>
        <li className="p-4 hover:bg-[#509CDB] hover:text-white">Features</li>
      </ul>
    </div>
  }


  const MainContent = () => {
    return <div className="bg-slate-400 p-4">
      <h2 className="text-bold text-xl mb-8">{title}</h2>
      {mainContent}
    </div>
  }

  return <div className="flex h-screen flex-col">
    <div className="overflow-hidden flex">
      <div className="lg:block hidden w-64 h-screen shadow-lg">
        <LeftMenu />
      </div>

      <main className="overflow-x-hidden overflow-y-auto p-4 w-full">
        <div className="p-4 shadow-md bg-blue-400 mb-4">
          <AdminAppBar />
        </div>
        <MainContent />
      </main>
    </div>
  </div>
}