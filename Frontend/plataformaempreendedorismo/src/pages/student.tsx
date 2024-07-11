import { useParams } from "react-router-dom"
import { AdminDefaultPage } from "../admin/components/defaultPage"
import { Student } from "../admin/components/student"


export const StudentPage = () => {
  const { id } = useParams()
  return <AdminDefaultPage mainContent={<Student id={Number(id)} />} title="Aluno" />
}