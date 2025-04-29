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
  linkPitch?: string
}


export interface Team extends TeamsResponse {
  banner: Banner
  odsList: Ods[]
}

export interface TeamIdResponse {
  nomeEquipe: string
  linkPitch: string | null
  alunos: Student[]
  professor: Teacher[]
  odsList: Ods[]
}

export interface TeamRegisterPayload {
  nomeTime: string
  alunos: Array<{
    cpf: string
    email: string
    nome: string
    turma: string
    isLider: boolean
    isViceLider: boolean
    idEquipe?: number
    dataNascimento: Date | string
    tamanhoCamisa: string
  }>
  idProfessor: number
  listIdOds: Array<{ id: number }>
  tipoAtividades: Array<{ id: number }>
  instituicoes: Array<{ id: number }>
}