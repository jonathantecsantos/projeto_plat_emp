import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { EvaluatorsComponent } from "../admin/components/evaluators/evaluators"

export const EvaluatorsPage = () => {
  return <AdminDefaultPage mainContent={<EvaluatorsComponent />} />
}