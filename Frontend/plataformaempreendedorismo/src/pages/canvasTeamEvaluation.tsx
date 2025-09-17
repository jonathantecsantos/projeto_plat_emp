import { useLocation } from "react-router-dom"
import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { CanvasTeamEvaluation } from "@/admin/components/canvas/canvasEvaluation"

export const CanvasEvaluationPage = () => {
  const location = useLocation()
  const { state } = location
  return <AdminDefaultPage mainContent={<CanvasTeamEvaluation teamData={state} />} />
}