//relatorios/relatorio-geral
export interface RelatorioGeral {
  equipe: string
  formato: string
  criterio: string
  subcriterio: string
  idSubcriterio: number
  totalNota: number
}

//relatorios/itens - relatorio
export interface ItensRelatorio {
  idSubcriterio: number
  descricaoSubcriterio: string
  descricaoCriterio: string,
  ordemRelatorio: number
}

//relatorios/notas-equipe/{idEquipe}
export interface ReportTeamId {
  equipe: string
  formato: string
  criterio: string
  subcriterio: string
  totalNota: number
}

//relatorios/classificacao
export interface ReportClassification {
  equipe: string
  totalNota: number
}

//relatorios/classificacao-por-formato/{idFormatoAvaliacao}
export interface ReportClassificationByFormat {
  equipe: string
  descricao: string
  totalNota: number
}