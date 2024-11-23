export interface FormatoAvaliacao {
  id: number
  descricao: string
}

export interface Evaluator {
  id: number
  nome: string
  instituicao: string
  email: string
  formatosAvaliacoes: FormatoAvaliacao[]
}
