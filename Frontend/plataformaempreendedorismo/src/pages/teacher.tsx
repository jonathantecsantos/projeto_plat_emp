import { useParams } from "react-router-dom"
import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { CreateTeacher } from "../admin/components/teachers/createTeacher"


export const TeacherPage = () => {
  const { id } = useParams()
  // const location = useLocation()
  // const { state } = location
  return <AdminDefaultPage mainContent={id !== ':id' ? <><p>update team component</p></> :
    <CreateTeacher />} />
}