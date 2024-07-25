import { AdminHomeComponent } from "../admin/components/adminHome"
import { AdminDefaultPage } from "../admin/components/common/defaultPage"

export const AdminHomePage = () => {

  return <AdminDefaultPage mainContent={<AdminHomeComponent />} />
}