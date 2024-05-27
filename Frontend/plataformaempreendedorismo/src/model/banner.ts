import { Student } from "./student"

export interface Banner {
  //header...
  yearTitle: string
  projectName: string
  students: Student[]
  leaders: Leader[]
  text: string
  image: string
  //orange...
  organizationalCapacity: OrganizationalCapacity
  //blue...
  businessFlow: BusinessFlow
  //pink...
  changeTeory: ChangeTeory
}

export interface Leader {
  name: string
}

export interface OrganizationalCapacity {
  team: string
  partners: string[]
  keyActivity: string
  resources: string
  costs: string[]
}

export interface BusinessFlow{
  marketOpportunity: string
  costs: string[]
  valuePropositions: string[]
  sources: string
  financialResult: string[]
}

export interface ChangeTeory {
  contextAndProblem: string
  publicImpactFocus: string
  interventions: string[]
  outputs: string
  shortTermResults: string
  mediumTermResults: string
  impactVision: string
}