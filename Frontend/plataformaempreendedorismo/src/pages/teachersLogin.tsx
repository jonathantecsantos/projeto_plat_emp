import { AdminDefaultPage } from "@/admin/components/common/defaultPage"
import { TeamSelection } from "@/admin/components/teams/teamSelection"

export const TeachersTeamListSelection = () => {
  return <AdminDefaultPage mainContent={<TeamSelection />} />
}