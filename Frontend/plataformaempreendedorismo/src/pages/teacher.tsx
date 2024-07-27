import { useLocation, useParams } from "react-router-dom"
import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { CreateTeacher } from "../admin/components/teachers/createTeacher"
import { UpdateOrCreateTeacherByTeam } from "../admin/components/teachers/updateTeacher"


export const TeacherPage = () => {
  const { id } = useParams()
  const location = useLocation()
  const { state } = location
  return <AdminDefaultPage mainContent={id !== ':id' || state ?
    <UpdateOrCreateTeacherByTeam id={Number(id)} teamData={state} /> :
    <CreateTeacher />} />
}