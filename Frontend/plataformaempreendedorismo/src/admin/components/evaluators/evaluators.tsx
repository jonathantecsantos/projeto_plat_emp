import { useGetEvaluatorsQuery } from "../../../api/studentApi"

export const EvaluatorsComponent = () => {
  const { data: evaluators } = useGetEvaluatorsQuery()

  return JSON.stringify(evaluators, null, 2)
}