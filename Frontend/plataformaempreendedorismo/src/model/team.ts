import { Student } from "./student";

export interface Team {
  id: number
  name: string
  students: Student[]
}