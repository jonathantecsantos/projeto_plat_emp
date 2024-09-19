
export interface EvaluationFormat {
  id: any
  description: string
}

export interface SubcriterioAvaliacao {
  id: number
  descricao: string
  notaMaxima: number
  valorPadrao: boolean
}

export interface CriterioAvaliacao {
  id: number
  descricao: string
  notaMaximaCriterio: number
  subcriterioAvaliacaos: SubcriterioAvaliacao[]
}

export interface SubcriterioAvaliacao {
  id: number;
  descricao: string;
  notaMaxima: number;
  valorPadrao: boolean;
}

export interface CriterioAvaliacao {
  id: number;
  descricao: string;
  notaMaximaCriterio: number;
  subcriterioAvaliacaos: SubcriterioAvaliacao[];
}

export type EvaluationById = CriterioAvaliacao[]

export interface Evaluation {
  idEquipe: number
  idCriterioAvaliacao: number
  idSubcriterioAvaliacao: number
  nota: number
  idAvaliador:number
  idTipoAvaliacao: number
}

export interface TeamEvaluation {
  evaluationTypeId: number
  evaluatorId: number
}

export interface TeamEvaluationResponse {
  id: number
  nome: string
  equipeAvaliada: boolean
}

export interface EvaluationData {
  idCriterioAvaliacao: number
  idSubcriterioAvaliacao: number
  nota: number
}