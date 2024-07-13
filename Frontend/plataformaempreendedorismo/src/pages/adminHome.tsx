import { AdminHomeComponent } from "../admin/components/adminHome"
import { AdminDefaultPage } from "../admin/components/defaultPage"

export const AdminHomePage = () => {

  return <AdminDefaultPage mainContent={<AdminHomeComponent />} />
}