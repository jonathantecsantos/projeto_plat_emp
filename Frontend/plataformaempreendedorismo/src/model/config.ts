export interface EventConfig {
  idEvento: number
  dataInicio: string
  dataFim: string
  tipoEvento?: {
    id: number,
    descricao: string
  }
}

export enum EventsTypes {
  INSCRICAO = 1,
  PROTOTIPO = 2,
  BANNER = 3,
  PITCH = 4,
}