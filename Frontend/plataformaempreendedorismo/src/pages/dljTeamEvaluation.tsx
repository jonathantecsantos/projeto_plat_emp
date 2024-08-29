import { useLocation, useParams } from "react-router-dom"
import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { DljTeamEvaluation } from "../admin/components/dlj/dljEvaluation"

export const DLJEvaluationPage = () => {
  const { id } = useParams()
  const location = useLocation()
  const { state } = location
  return <AdminDefaultPage mainContent={<DljTeamEvaluation id={Number(id)} teamData={state} />} />
}