
export interface EvaluationFormat {
  id: any
  description: string
}

export interface SubCriterio {
  id: number
  descricao: string
  notaMaxima: number
  valorPadrao: boolean
}

export interface Criterio {
  id: number
  descricao: string
  notaMaximaCriterio: number
  subcriterios: SubCriterio[]
}

export interface EvaluationById extends EvaluationFormat {
  criterios: Criterio[]
}