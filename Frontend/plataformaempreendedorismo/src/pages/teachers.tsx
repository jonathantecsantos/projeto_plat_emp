import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { TeachersComponent } from "../admin/components/teachers/teachers"

export const TeachersPage = () => {
  return <AdminDefaultPage mainContent={<TeachersComponent />} />
}