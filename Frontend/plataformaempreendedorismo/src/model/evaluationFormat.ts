import { Evaluator } from "./evaluator"

export interface EvaluationFormat {
  id: any
  description: string
  evaluators: Evaluator[]
}