import { DljClassificationComponent } from "../admin/components/classificationDlj/dljClassification"
import { AdminDefaultPage } from "../admin/components/common/defaultPage"

export const DljClassificationPage = () => {
  return <AdminDefaultPage mainContent={<DljClassificationComponent />} />
}