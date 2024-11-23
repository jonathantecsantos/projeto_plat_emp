import { useLocation, useParams } from "react-router-dom"
import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { CreateEvaluator } from "../admin/components/evaluators/createEvaluator"
import { UpdateOrCreateTeacherByTeam } from "../admin/components/teachers/updateTeacher"


export const EvaluatorPage = () => {
  const { id } = useParams()
  const location = useLocation()
  const { state } = location
  return <AdminDefaultPage mainContent={id !== ':id' || state ?
    <UpdateOrCreateTeacherByTeam id={Number(id)} teamData={state} /> :
    <CreateEvaluator />} />
}