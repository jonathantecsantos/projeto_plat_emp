import { TeamConfig } from "./student"
import { Team, TeamsResponse } from "./team"

export interface Teacher {
  id: number
  nome: string
  cpf: string
  email: string
  dataNascimento: Date
  tamanhoCamisa: TeamConfig.ShirtSize
}

export interface TeacherIdResponse {
  id: number
  nome: string
  cpf: string
  dataNascimento: Date,
  tamanhoCamisa: string,
  email: string
  equipe: Team[]
}


export interface TeachersResponse extends Teacher {
  equipeRecord: TeamsResponse[]
}

export interface CreateOrUpdateTeacher {
  // id: number
  nome: string
  cpf: string
  email: string
  idEquipe: number[]
  dataNascimento: Date,
  tamanhoCamisa: string,
}
