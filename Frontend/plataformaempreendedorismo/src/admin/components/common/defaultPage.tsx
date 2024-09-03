import LogoutIcon from '@mui/icons-material/Logout'
import { Divider } from "@mui/material"
import { ReactNode } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
// import logo from '../../assets/logo.svg'
import { RoutesNames } from "../../../globals"
import { logout } from "../../../redux/reducers/auth.slice"
import { BreadcrumbComponent } from "./breadcrumb"
import { DrawerComponent } from "./drawer"
import { LeftMenuComponent } from "./leftMenu"
import { clearEvaluations } from '../../../redux/reducers/evaluations.slice'

interface AdminPage {
  mainContent: ReactNode
}

const AdminAppBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const userGlobalState = useSelector((state: RootState) => state.userInfo.data)

  return (
    <div className="flex  text-[#3C14A4] justify-between lg:p-4 p-1 px-4 fixed top-0 left-0 right-0 z-10">
      <div className="block lg:hidden">
        <DrawerComponent />
      </div>
      {/* <div className='lg:block hidden first-letter:uppercase mx-56'>
        {userGlobalState.profile}: {userGlobalState.username}
      </div> */}
      <div className="flex-grow"></div>
      <div className="flex gap-2 items-center"
        onClick={() => {
          dispatch(logout())
          dispatch(clearEvaluations())
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
  // const backgroundImageUrl = logo
  const navigate = useNavigate()

  return (
    <div className=" text-[#3C14A4] h-full">
      <div className="w-full p-4">
        {/* <img
          src={backgroundImageUrl}
          className="-z-10 mb-4 cursor-pointer"
          onClick={() => navigate(RoutesNames.home)}
        /> */}
        <h2
          onClick={() => navigate(RoutesNames.home)}
          className="cursor-pointer font-bold text-center text-white bg-gradient-to-r from-indigo-500 to-indigo-900 p-2 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          Plataforma Empreendedorismo
        </h2>
      </div>
      <Divider variant="middle" color="white" />
      <LeftMenuComponent />
    </div>
  )
}

export const AdminDefaultPage = ({ mainContent }: AdminPage) => {
  return (
    <div className="flex h-screen flex-col">
      <AdminAppBar />
      <div className="flex flex-1 overflow-hidden">
        <div className="lg:block hidden w-64 h-full shadow-lg z-10 overflow-y-auto">
          <LeftMenu />
        </div>
        <main className="overflow-x-hidden overflow-y-auto w-full mt-8">
          <div className="p-4">
            <BreadcrumbComponent />
            {mainContent}
          </div>
        </main>
      </div>
    </div>
  )
}
