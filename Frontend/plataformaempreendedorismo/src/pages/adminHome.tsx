import { useSelector } from "react-redux"
import { AdminHomeComponent } from "../admin/components/adminHome"
import { AdminDefaultPage } from "../admin/components/defaultPage"
import { RootState } from "../redux/store"

export const AdminHomePage = () => {
  const userGlobalState = useSelector((state: RootState) => state.userInfo.data.username)

  return <AdminDefaultPage mainContent={<AdminHomeComponent />} title={`Bem-vindo! ${userGlobalState}`} />
}