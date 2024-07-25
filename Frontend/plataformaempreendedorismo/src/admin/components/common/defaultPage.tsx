import LogoutIcon from '@mui/icons-material/Logout'
import { Divider } from "@mui/material"
import { ReactNode } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
// import logo from '../../assets/logo.svg'
import { RoutesNames } from "../../../globals"
import { logout } from "../../../redux/reducers/auth.slice"
import { RootState } from '../../../redux/store'
import { BreadcrumbComponent } from "./breadcrumb"
import { DrawerComponent } from "./drawer"
import { LeftMenuComponent } from "./leftMenu"

interface AdminPage {
  mainContent: ReactNode
}

const AdminAppBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userGlobalState = useSelector((state: RootState) => state.userInfo.data)

  return (
    <div className="flex bg-[#152259] text-white justify-between lg:p-4 p-1 px-4 fixed top-0 left-0 right-0 z-10">
      <div className="block lg:hidden">
        <DrawerComponent />
      </div>
      <div className='lg:block hidden first-letter:uppercase mx-56'>
        {userGlobalState.profile}: {userGlobalState.username}
      </div>
      <div className="flex-grow"></div>
      <div className="flex gap-2 items-center"
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
  // const backgroundImageUrl = logo
  const navigate = useNavigate()

  return (
    <div className=" text-[#cecece] h-full">
      <div className="w-full p-4">
        {/* <img
          src={backgroundImageUrl}
          className="-z-10 mb-4 cursor-pointer"
          onClick={() => navigate(RoutesNames.home)}
        /> */}
        <h2
          onClick={() => navigate(RoutesNames.home)}
          className="cursor-pointer font-bold text-center text-white bg-gradient-to-r from-blue-500 to-blue-900 p-2 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
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
        <div className="lg:block hidden w-64 h-full shadow-lg z-10 overflow-y-auto bg-[#152259]">
          <LeftMenu />
        </div>
        <main className="overflow-x-hidden overflow-y-auto p-4 w-full mt-14 rounded-lg">
          <div className="p-4 shadow-md border mb-4 rounded-3xl bg-white">
            <BreadcrumbComponent />
            {mainContent}
          </div>
        </main>
      </div>
    </div>
  )
}
