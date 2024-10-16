import { SharkTankClassificationComponent } from "../admin/components/classificationSharkTank/sharkTankClassification"
import { AdminDefaultPage } from "../admin/components/common/defaultPage"

export const SharkTankClassificationPage = () => {
  return <AdminDefaultPage mainContent={<SharkTankClassificationComponent />} />
}