import { Banner } from "./banner"
import { Ods } from "./ods"
import { Student } from "./student"
import { Teacher } from "./teacher"

export interface ListIdOds {
  id: number
}

export interface TeamsResponse {
  id: number
  nome: string
  linkPitch?: string
  listIdOds: ListIdOds[]
}

export interface UpdateTeam {
  nome?: string
  listIdOds?: ListIdOds[]
}


export interface Team extends TeamsResponse {
  banner: Banner
  odsList: Ods[]
}

export interface TeamIdResponse {
  nomeEquipe: string
  alunos: Student[]
  professor: Teacher
  odsList: Ods[]
}