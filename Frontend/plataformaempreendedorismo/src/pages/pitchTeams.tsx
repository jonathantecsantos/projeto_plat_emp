import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { PitchTeams } from "../admin/components/pitch/pitch"

export const PitchPage = () => {
  return <AdminDefaultPage mainContent={<PitchTeams />} />
}