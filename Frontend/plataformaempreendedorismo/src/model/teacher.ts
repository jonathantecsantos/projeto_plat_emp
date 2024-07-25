import { Team, TeamsResponse } from "./team"

export interface Teacher {
  id: number
  nome: string
  cpf: string
  email: string
}

export interface TeacherIdResponse {
  id: number
  nome: string
  cpf: string
  email: string
  equipe: Team
}


export interface TeachersResponse extends Teacher {
  equipeRecord: TeamsResponse
}

export interface CreateOrUpdateTeacher {
  id: number
  nome: string
  cpf: string
  email: string
  idEquipe: number
}
