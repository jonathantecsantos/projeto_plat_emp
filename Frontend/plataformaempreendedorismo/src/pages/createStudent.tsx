import { AddStudent } from "../admin/components/createStudent"
import { AdminDefaultPage } from "../admin/components/defaultPage"


export const CreateStudentPage = () => {
  return <AdminDefaultPage mainContent={<AddStudent />} title="Adicionar Aluno" />
}