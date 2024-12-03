export interface EventConfig {
  dataInicio: string
  dataFim: string
  idEvento: number
}

export enum EventsTypes {
  INSCRICAO = 1,
  PROTOTIPO = 2,
  BANNER = 3,
  PITCH = 4,
}