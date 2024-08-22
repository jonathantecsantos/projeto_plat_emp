import { Banner } from "./banner"
import { Ods } from "./ods"
import { Student } from "./student"
import { TeacherIdResponse } from "./teacher"

export interface TeamsResponse {
  id: number
  nome: string
  linkPitch: string
}

export interface Team extends TeamsResponse {
  banner: Banner
  odsList: Ods[]
}

export interface TeamIdResponse {
  nomeEquipe: string
  alunos: Student[]
  professor: TeacherIdResponse
}