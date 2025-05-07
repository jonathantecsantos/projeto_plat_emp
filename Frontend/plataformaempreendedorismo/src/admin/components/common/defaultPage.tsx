import { Divider } from "@mui/material"
import { ReactNode } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import lampLogo from '../../../assets/lamplogo.png'
import { RoutesNames } from "../../../globals"
import { RootState } from "../../../redux/store"
import { Roles } from "../../../utils/types"
import { BannerImage } from "./adminBanner"
import { BreadcrumbComponent } from "./breadcrumb"
import { LeftMenuComponent } from "./leftMenu"
import { Logout } from "./logout"
import { ToggleMenuButton } from "./toggleMenuButton"

interface AdminPage {
  mainContent: ReactNode
}

const LeftMenu = () => {
  const navigate = useNavigate()
  return (
    <div className=" text-[#3C14A4] h-full z-30">
      <div className="w-full p-6 flex justify-center"
        onClick={() => navigate(RoutesNames.adminHome)}>
        <img src={lampLogo} alt="Trophy" className="cursor-pointer transform hover:scale-125 transition-transform duration-300 w-16 h-16 hover:rotate-12" />
      </div>
      <Divider variant="middle" color="white" />
      <LeftMenuComponent />
    </div>
  )
}

export const AdminDefaultPage = ({ mainContent }: AdminPage) => {
  const userGlobalState = useSelector((state: RootState) => state.userInfo)
  const isMenuOpen = useSelector((state: RootState) => state.menuState.isOpen)

  return (
    <div className="flex h-screen flex-col relative">
      <div className="flex flex-1 overflow-hidden">
        {[Roles.Aluno, Roles.Professor].includes(userGlobalState.enumRole!) ? null :
          <div className={`${isMenuOpen ? 'lg:block min-w-fit ' : 'hidden'} w-64 h-full shadow-lg z-10 overflow-y-auto`}>
            <LeftMenu />
          </div>}

        <main className="overflow-x-hidden overflow-y-auto w-full">
          {[Roles.Aluno, Roles.Professor].includes(userGlobalState.enumRole!) ? null : <ToggleMenuButton />}
          <BannerImage />
          <div className="px-2 py-4 h-[calc(100%-9rem)]">
            <div className="flex">
              {[Roles.Aluno, Roles.Professor].includes(userGlobalState.enumRole!) ? <div className="w-full mt-10"></div> : <BreadcrumbComponent />}
              <Logout />
            </div>
            {mainContent}
          </div>
        </main>
      </div>
    </div>
  )
}
