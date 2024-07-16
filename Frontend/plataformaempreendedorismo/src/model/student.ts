import { Ods } from "./ods"
import { Team } from "./team"

export interface Student {
  id: number
  cpf: string
  nome: string
  email: string
  turma: string
  isLider: boolean
  isViceLider: boolean
  ods: Ods
}

export interface CreateOrUpdateStudent {
  nome: string
  cpf: string
  email: string
  turma: string
  isLider: boolean
  isViceLider: boolean
  idOds: number | null
  idEquipe: number | null
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

export interface StudentIdResponse {
  id: number
  cpf: string
  nome: string
  email: string
  turma: string
  isLider: boolean
  isViceLider: boolean
  ods: Ods
  equipe: Team
}