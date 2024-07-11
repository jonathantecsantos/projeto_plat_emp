import { AdminDefaultPage } from "../admin/components/defaultPage"
import { Students } from "../admin/components/students"

export const StudentsDetailsPage = () => {

  return <AdminDefaultPage title="Alunos" mainContent={<Students />} />
}