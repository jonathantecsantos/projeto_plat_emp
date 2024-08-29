import { useParams } from "react-router-dom"
import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { DljTeamEvaluation } from "../admin/components/dlj/dljEvaluation"

export const DLJEvaluationPage = () => {
  const { id } = useParams()
  return <AdminDefaultPage mainContent={<DljTeamEvaluation id={Number(id)} />} />
}