import { useLocation } from "react-router-dom"
import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { SharkTankTeamEvaluation } from "../admin/components/sharkTank/shankTankEvaluation"

export const SharkTankEvaluationPage = () => {
  const location = useLocation()
  const { state } = location
  return <AdminDefaultPage mainContent={<SharkTankTeamEvaluation teamData={state} />} />
}