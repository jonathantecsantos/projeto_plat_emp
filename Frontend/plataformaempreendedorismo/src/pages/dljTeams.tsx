import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { DLJTeams } from "../admin/components/dlj/dlj"

export const DLJPage = () => {
  return <AdminDefaultPage mainContent={<DLJTeams />} />
}