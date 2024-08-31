import { useLocation } from "react-router-dom"
import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { PitchTeamEvaluation } from "../admin/components/pitch/pitchEvaluation"

export const PitchEvaluationPage = () => {
  const location = useLocation()
  const { state } = location
  return <AdminDefaultPage mainContent={<PitchTeamEvaluation teamData={state} />} />
}