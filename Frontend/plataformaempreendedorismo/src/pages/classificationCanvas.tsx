import { CanvasClassificationComponent } from "@/admin/components/classificationCanva/pitchClassification"
import { AdminDefaultPage } from "../admin/components/common/defaultPage"

export const CanvasClassificationPage = () => {
  return <AdminDefaultPage mainContent={<CanvasClassificationComponent />} />
}