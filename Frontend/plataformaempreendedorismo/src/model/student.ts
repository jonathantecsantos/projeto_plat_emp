import { Ods } from "./ods"
import { Team, TeamsResponse } from "./team"


export namespace Student {
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
  dataNascimento: Date
  tamanhoCamisa: Student.ShirtSize
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
  dataNascimento: Date
  tamanhoCamisa: Student.ShirtSize
}

