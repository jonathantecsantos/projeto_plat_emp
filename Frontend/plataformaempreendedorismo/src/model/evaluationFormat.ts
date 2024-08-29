
export interface EvaluationFormat {
  id: any
  description: string
}

// export interface SubCriterio {
//   id: number
//   descricao: string
//   notaMaxima: number
//   valorPadrao: boolean
// }

// export interface Criterio {
//   id: number
//   descricao: string
//   notaMaximaCriterio: number
//   subcriterios: SubCriterio[]
// }

// export interface EvaluationById extends EvaluationFormat {
//   criterios: Criterio[]
// }


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

// export interface EvaluationById {
//   id: number
//   descricao: string
//   notaMaximaCriterio: number
//   subcriterioAvaliacaos: CriterioAvaliacao[]
// }

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

// A resposta do endpoint é um array de CriterioAvaliacao
export type EvaluationById = CriterioAvaliacao[];
