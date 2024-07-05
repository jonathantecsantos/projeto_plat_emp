import { Student } from "./student"

export interface Team {
  nomeEquipe: string
  alunos: Student[]
  professor: any
}

export interface TeamApiResponse {
  nomeEquipe: string
  alunos: Student[]
  professor: any
}