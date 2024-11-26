import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { Coordinators } from "../admin/components/coordinators/coordinators"

export const CoordinatorsPage = () => {
  return <AdminDefaultPage mainContent={<Coordinators />} />
}