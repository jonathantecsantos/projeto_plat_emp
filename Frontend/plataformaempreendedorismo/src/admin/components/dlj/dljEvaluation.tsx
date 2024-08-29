import { EvaluationFormat } from "../../../model/evaluationFormat"


export const DljTeamEvaluation = ({ id }: Pick<EvaluationFormat, 'id'>) => {
  console.log(id)
  return <p>Team {id}</p>
}