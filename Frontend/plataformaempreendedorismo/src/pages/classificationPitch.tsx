import { PitchClassificationComponent } from "../admin/components/classificationPitch/pitchClassification"
import { AdminDefaultPage } from "../admin/components/common/defaultPage"

export const PitchClassificationPage = () => {
  return <AdminDefaultPage mainContent={<PitchClassificationComponent />} />
}