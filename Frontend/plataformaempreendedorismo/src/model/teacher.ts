import { Team } from "./team"

export interface Teacher {
  id: number
  nome: string
  cpf: string
  email:string
  equipe: Team
}