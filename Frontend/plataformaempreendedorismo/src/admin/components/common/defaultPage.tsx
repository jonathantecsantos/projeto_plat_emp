import { Divider } from "@mui/material"
import { ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { RoutesNames } from "../../../globals"
import { BannerImage } from './adminBanner'
import { BreadcrumbComponent } from "./breadcrumb"
import { DrawerComponent } from "./drawer"
import { LeftMenuComponent } from "./leftMenu"
import { Logout } from "./logout"

interface AdminPage {
  mainContent: ReactNode
}

const AdminAppBar = () => {
  return (
    <div className="flex  text-[#3C14A4] justify-between lg:p-4 p-1 px-4 fixed top-0 left-0 right-0 z-10">
      <div className="block lg:hidden">
        <DrawerComponent />
      </div>
    </div>
  )
}

const LeftMenu = () => {
  const navigate = useNavigate()
  return (
    <div className=" text-[#3C14A4] h-full z-30">
      <div className="w-full p-4">
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
        <main className="overflow-x-hidden overflow-y-auto w-full">
          <BannerImage />
          <div className="p-4 h-[calc(100%-9rem)]">
            <div className="flex">
              <BreadcrumbComponent />
              <Logout />
            </div>
            {mainContent}
          </div>
          {/* <FooterImage /> */}
        </main>
      </div>
    </div>
  )
}
