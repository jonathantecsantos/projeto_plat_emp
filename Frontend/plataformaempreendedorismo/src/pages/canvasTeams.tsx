import { CanvasTeams } from "@/admin/components/canvas/canvas"
import { AdminDefaultPage } from "../admin/components/common/defaultPage"

export const CanvasPage = () => {
  return <AdminDefaultPage mainContent={<CanvasTeams />} />
}