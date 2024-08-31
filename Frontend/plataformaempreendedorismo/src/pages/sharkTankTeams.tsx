import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { SharkTankTeams } from "../admin/components/sharkTank/sharkTank"

export const SharkTankPage = () => {
  return <AdminDefaultPage mainContent={<SharkTankTeams />} />
}