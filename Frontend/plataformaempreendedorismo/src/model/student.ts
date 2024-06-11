import { Ods } from "./ods"
import { Team } from "./team"

export interface Student {
  id: any
  cpf: string
  name: string
  email: string
  class: string
  isLeader?: boolean
  isViceLeader?: boolean

  ods?: Ods
  team_id?: string
  team?: Team
}