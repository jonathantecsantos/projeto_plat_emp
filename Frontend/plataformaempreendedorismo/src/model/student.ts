import { Group } from "./group"

export interface Student {
  id: number
  name: string
  group?: Group | null,
}


export interface Students {
  students: Student[]
}
