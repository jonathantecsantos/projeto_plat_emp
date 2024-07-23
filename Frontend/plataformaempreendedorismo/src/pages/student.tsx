import { useParams } from "react-router-dom"
import { AdminDefaultPage } from "../admin/components/defaultPage"
import { CreateStudent } from "../admin/components/students/createStudent"
import { UpdateStudent } from "../admin/components/students/updateStudent"


export const StudentPage = () => {
  const { id } = useParams()
  return <AdminDefaultPage mainContent={id !== ':id' ? <UpdateStudent id={Number(id)} /> : <CreateStudent />} />
}