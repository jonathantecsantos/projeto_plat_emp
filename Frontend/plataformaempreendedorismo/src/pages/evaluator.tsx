import { useParams } from "react-router-dom"
import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { CreateEvaluator } from "../admin/components/evaluators/createEvaluator"
import { UpdateEvaluator } from "../admin/components/evaluators/updateEvaluator"


export const EvaluatorPage = () => {
  const { id } = useParams()
  return <AdminDefaultPage mainContent={id !== ':id' ? <UpdateEvaluator id={Number(id)} /> : <CreateEvaluator />} />
}