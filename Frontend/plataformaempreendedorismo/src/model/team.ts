import { Student } from "./student"
import { Teacher } from "./teacher"

export interface Team {
  id: number
  nome: string
  linkPitch: string
}

export interface TeamIdResponse {
  nomeEquipe: string
  alunos: Student[]
  professor: Teacher
}