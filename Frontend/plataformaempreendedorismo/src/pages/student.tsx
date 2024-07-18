import { useParams } from "react-router-dom"
import { CreateStudent } from "../admin/components/createStudent"
import { AdminDefaultPage } from "../admin/components/defaultPage"
import { UpdateStudent } from "../admin/components/updateStudent"


export const StudentPage = () => {
  const { id } = useParams()
  return <AdminDefaultPage mainContent={id !== ':id' ? <UpdateStudent id={Number(id)} /> : <CreateStudent />} />
}