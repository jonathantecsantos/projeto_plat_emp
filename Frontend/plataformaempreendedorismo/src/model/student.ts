import { Ods } from "./ods"
import { Team } from "./team"


export namespace TeamConfig {
  export enum ShirtSize {
    PP = "PP",
    P = "P",
    M = "M",
    G = "G",
    GG = "GG",
    XG = "XG",
    XGG = "XGG",
  }

}
export interface Student {
  id: number
  cpf: string
  nome: string
  email: string
  turma: string
  isLider: boolean
  isViceLider: boolean
  dataNascimento: string
  tamanhoCamisa: TeamConfig.ShirtSize
  anoLetivo?: number
}

export interface StudentIdResponse extends Student {
  ods: Ods
  equipe: Team
}

export interface StudentsResponse extends Student {
  nomeEquipe: string
}

export interface CreateOrUpdateStudent {
  cpf: string
  email: string
  nome: string
  turma: string
  isLider: boolean
  isViceLider: boolean
  idEquipe: number
  dataNascimento: string
  tamanhoCamisa: TeamConfig.ShirtSize
}

export interface StudentRecordResponse {
  login: string
  senha: string
}