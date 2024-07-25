import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { Teams } from "../admin/components/teams/teams"

export const TeamsPage = () => {
  return <AdminDefaultPage mainContent={<Teams />} />
}