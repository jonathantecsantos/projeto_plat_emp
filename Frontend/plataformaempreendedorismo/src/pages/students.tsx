import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { Students } from "../admin/components/students/students"

export const StudentsDetailsPage = () => {
  return <AdminDefaultPage mainContent={<Students />} />
}