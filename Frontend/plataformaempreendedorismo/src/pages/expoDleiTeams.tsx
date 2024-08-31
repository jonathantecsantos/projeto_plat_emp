import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { ExpoDleiTeams } from "../admin/components/expoDlei/expoDlei"

export const ExpoDleiPage = () => {
  return <AdminDefaultPage mainContent={<ExpoDleiTeams />} />
}