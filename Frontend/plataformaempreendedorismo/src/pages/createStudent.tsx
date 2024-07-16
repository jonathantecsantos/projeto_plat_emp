import { CreateStudent } from "../admin/components/createStudent"
import { AdminDefaultPage } from "../admin/components/defaultPage"


export const StudentPage = () => {
  return <AdminDefaultPage mainContent={<CreateStudent />} />
}