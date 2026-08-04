import { TeamConfig } from "./student"
import { Team } from "./team"

export interface Teacher {
  id: number
  nome: string
  cpf: string
  email: string
  dataNascimento: string
  tamanhoCamisa: TeamConfig.ShirtSize
  habilitado?: boolean
}

export interface TeacherIdResponse {
  id: number
  nome: string
  cpf: string
  dataNascimento: string,
  tamanhoCamisa: string,
  email: string
  equipe: Team[]
  habilitado?: boolean
}


export interface TeachersResponse extends Teacher {
  equipeNomeRecord: string[]
}

export interface CreateOrUpdateTeacher {
  // id: number
  nome: string
  cpf: string
  email: string
  idEquipe: number[]
  dataNascimento: string,
  tamanhoCamisa: string,
  habilitado?: boolean
}
