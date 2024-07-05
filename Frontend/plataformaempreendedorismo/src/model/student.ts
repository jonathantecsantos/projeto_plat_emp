import { Ods } from "./ods"

export interface Student {
  //reponse da equipe
  id: any
  cpf: string
  nome: string
  email: string
  turma: string
  isLider?: boolean
  isViceLider?: boolean
  ods?: Ods

  // team_id?: string
  // team?: Team
}

export interface CreateStudent {
  nome: string
  cpf: string
  email: string
  turma: string
  isLider: boolean
  isViceLider: boolean
  idOds: number
  idEquipe: number
}

export interface StudentsResponse {
  id: number
  cpf: string
  nome: string
  email: string
  turma: string
  isLider: boolean
  isViceLider: boolean
  idEquipe: number
  nomeEquipe: string
  idObs: number
}