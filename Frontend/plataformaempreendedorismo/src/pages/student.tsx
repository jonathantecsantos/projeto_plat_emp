import { useLocation, useParams } from "react-router-dom"
import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { CreateStudent } from "../admin/components/students/createStudent"
import { UpdateOrCreateStudentByTeam } from "../admin/components/students/updateOrCreateStudentByTeam"


export const StudentPage = () => {
  const { id } = useParams()
  const location = useLocation()
  const { state } = location
  return <AdminDefaultPage mainContent={id !== ':id' || state ? <UpdateOrCreateStudentByTeam id={Number(id)}
    teamData={state} /> :
    <CreateStudent />} />
}