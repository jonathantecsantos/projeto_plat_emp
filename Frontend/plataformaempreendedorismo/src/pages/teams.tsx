import { AdminDefaultPage } from "../admin/components/defaultPage"
import { Teams } from "../admin/components/teams"

export const TeamsPage = () => {
  return <AdminDefaultPage mainContent={<Teams />} />
}