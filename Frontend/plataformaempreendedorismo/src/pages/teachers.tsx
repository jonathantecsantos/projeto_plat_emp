import { AdminDefaultPage } from "../admin/components/defaultPage"
import { TeachersComponent } from "../admin/components/teachers"

export const TeachersPage = () => {
  return <AdminDefaultPage mainContent={<TeachersComponent />} />
}