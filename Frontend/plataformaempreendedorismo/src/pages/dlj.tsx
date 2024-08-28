import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { DLJComponent } from "../admin/components/dlj"

export const DLJPage = () => {
  return <AdminDefaultPage mainContent={<DLJComponent />} />
}