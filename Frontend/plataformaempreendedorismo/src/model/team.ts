export interface ODS {
  id: number
  codigo: string
  descricao: string
}

export interface Student {
  id: number
  cpf: string
  nome: string
  email: string
  turma: string
  isLider: boolean
  isViceLider: boolean
  ods: ODS
}

export interface Team {
  nomeEquipe: string
  alunos: Student[]
  professor: any
}

export interface TeamApiResponse {
  nomeEquipe: string
  alunos: Student[]
  professor: any
}