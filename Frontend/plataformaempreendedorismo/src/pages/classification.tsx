import { ClassificationComponent } from "../admin/components/classification/classification"
import { AdminDefaultPage } from "../admin/components/common/defaultPage"

export const ClassificationPage = () => {
  return <AdminDefaultPage mainContent={<ClassificationComponent />} />
}