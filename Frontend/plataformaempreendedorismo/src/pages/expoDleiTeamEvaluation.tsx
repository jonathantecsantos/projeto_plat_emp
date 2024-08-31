import { useLocation } from "react-router-dom"
import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { ExpoDleiTeamEvaluation } from "../admin/components/expoDlei/expoDleiEvaluation"

export const ExpoDleiEvaluationPage = () => {
  const location = useLocation()
  const { state } = location
  return <AdminDefaultPage mainContent={<ExpoDleiTeamEvaluation teamData={state} />} />
}