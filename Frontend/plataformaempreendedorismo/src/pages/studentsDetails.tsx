import { AdminDefaultPage } from "../admin/components/defaultPage"
import { StudentsDetails } from "../admin/components/studentsDetails"

export const StudentsDetailsPage = () => {
  
  return <AdminDefaultPage title="Alunos"mainContent={<StudentsDetails />} />
}