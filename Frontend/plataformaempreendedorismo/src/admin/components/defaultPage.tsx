import { ReactNode } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { LeftMenuComponent } from "../../components/common/leftMenu"
import { RoutesNames } from "../../globals"
import { logout } from "../../redux/reducers/auth.slice"
import LogoutIcon from '@mui/icons-material/Logout';

interface AdminPage {
  mainContent: ReactNode
  title: string
}

const AdminAppBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className="flex  bg-[#152259]  text-white  justify-end p-4 fixed top-0 left-0 right-0 z-10">
      <div className="flex gap-2"
        onClick={() => {
          dispatch(logout())
          navigate(RoutesNames.home)
        }} >
        <LogoutIcon className="text-right cursor-pointer" />
        <button className="text-right cursor-pointer">
          Logout
        </button>
      </div>
    </div>
  )
}

const LeftMenu = () => {
  const backgroundImageUrl = `./src/assets/logo.svg`
  const navigate = useNavigate()

  return (
    <div className="bg-[#152259] text-[#cecece] h-screen">
      <div className="w-full p-4 border-gray-300 border-b">
        <img
          src={backgroundImageUrl}
          className="-z-10 mt-4 cursor-pointer"
          onClick={() => navigate(RoutesNames.home)}
        />
        <h2
          onClick={() => navigate(RoutesNames.home)}
          className="my-4 cursor-pointer font-bold text-center text-white bg-gradient-to-r from-blue-500 to-blue-900 p-2 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          Plataforma Empreendedorismo
        </h2>
      </div>
      <LeftMenuComponent />
    </div>
  )
}

export const AdminDefaultPage = ({ mainContent, title }: AdminPage) => {
  return (
    <div className="flex h-screen flex-col">
      <AdminAppBar />
      <div className="flex flex-1 overflow-hidden">
        <div className="lg:block hidden w-64 h-full shadow-lg z-10">
          <LeftMenu />
        </div>
        <main className="overflow-x-hidden overflow-y-auto p-4 w-full mt-14 rounded-lg">
          <div className="p-4 shadow-md border mb-4 rounded-3xl bg-white">
            <h2 className="text-bold text-xl mb-8 bg-slate-50">{title}</h2>
            {mainContent}
          </div>
        </main>
      </div>
    </div>
  )
}
