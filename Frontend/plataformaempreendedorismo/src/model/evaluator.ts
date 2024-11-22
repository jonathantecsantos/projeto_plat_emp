
export interface SubcriterioAvaliacao {
  id: number
  descricao: string
  notaMaxima: number
  valorPadrao: boolean
  ordemRelatorio: number
}

export interface Criterio {
  id: number
  descricao: string
  notaMaximaCriterio: number
  subcriterioAvaliacaos: SubcriterioAvaliacao[]
}

export interface FormatoAvaliacao {
  id: number
  descricao: string
  criterios: Criterio[]
}

export interface Evaluator {
  id: number
  nome: string
  instituicao: string
  formatosAvaliacoes: FormatoAvaliacao[]
}
