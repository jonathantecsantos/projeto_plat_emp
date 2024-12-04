import { Avatar, Divider } from "@mui/material"
import { ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { RoutesNames } from "../../../globals"
import { BreadcrumbComponent } from "./breadcrumb"
import { DrawerComponent } from "./drawer"
import { LeftMenuComponent } from "./leftMenu"
import { Logout } from "./logout"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import { Roles } from "../../../utils/types"
import { BannerImage } from "./adminBanner"

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
      <div className="w-full p-6 flex justify-center"
        onClick={() => navigate(RoutesNames.adminHome)}>
        <Avatar alt="admin avatar"
          className=" bg-[#3C14A4] shadow-md cursor-pointer transform hover:scale-105 transition-transform duration-300 w-16 h-16"
        />
      </div>
      <Divider variant="middle" color="white" />
      <LeftMenuComponent />
    </div>
  )
}

export const AdminDefaultPage = ({ mainContent }: AdminPage) => {
  const userGlobalState = useSelector((state: RootState) => state.userInfo)

  return (
    <div className="flex h-screen flex-col relative">
      {userGlobalState?.enumRole == Roles.Aluno ? <div className=""></div> : <AdminAppBar />}
      <div className="flex flex-1 overflow-hidden">
        {userGlobalState?.enumRole == Roles.Aluno ? <div className=""></div> :
          <div className="lg:block hidden w-64 h-full shadow-lg z-10 overflow-y-auto">
            <LeftMenu />
          </div>}

        <main className="overflow-x-hidden overflow-y-auto w-full">
          <BannerImage />
          <div className="px-2 py-4 h-[calc(100%-9rem)]">
            <div className="flex">
              {userGlobalState?.enumRole == Roles.Aluno ? <div className="w-full mt-10"></div> : <BreadcrumbComponent />}
              <Logout />
            </div>
            {mainContent}
          </div>
        </main>
      </div>
     
    </div>
  )
}
