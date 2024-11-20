import { Ods } from "./ods"
import { Team, TeamsResponse } from "./team"

export interface Student {
  id: number
  cpf: string
  nome: string
  email: string
  turma: string
  isLider: boolean
  isViceLider: boolean
}

export interface StudentIdResponse extends Student {
  ods: Ods
  equipe: Team
}

export interface StudentsResponse extends Student {
  equipeRecord: TeamsResponse
}

export interface CreateOrUpdateStudent {
  cpf: string
  email: string
  nome: string
  turma: string
  isLider: boolean
  isViceLider: boolean
  idEquipe: number | null
}

