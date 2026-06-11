import { ActivityType } from "./activityTypes"
import { Banner } from "./banner"
import { Institution } from "./institution"
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
  tipoAtividades: ActivityType[],
  instituicoes: Institution[]
}

export interface UpdateTeam {
  nome?: string
  listIdOds?: ListIdOds[]
  linkPitch?: string
  tipoAtividadeList?: ActivityType[],
  instituicoes?: Institution[]
  nomeParceiro1?: string
  nomeParceiro2?: string
}


export interface Team extends TeamsResponse {
  banner: Banner
  odsList: Ods[]
}

export interface TeamIdResponse {
  nomeEquipe: string
  ano: number
  linkPitch: string | null
  alunos: Student[]
  professores: Teacher[]
  odsList: Ods[]
  tipoAtividades: ActivityType[],
  instituicoes: Institution[]
  logomarcaTime: string | null
  nomeParceiro1: string | null
  logomarcaParceiro1: string | null
  nomeParceiro2: string | null
  logomarcaParceiro2: string | null
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
  nomeParceiro1?: string
  nomeParceiro2?: string
}