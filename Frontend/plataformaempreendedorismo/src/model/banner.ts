export interface Anexo {
  id: number
  nomeAnexo: string
  caminhoAnexo: string
}

export interface Banner {
  id: number
  textoDescricaoQ0: string
  anexos?: Anexo[]
  equipeQ1: string
  parceiroQ1: string
  atividadeChaveQ1: string
  recursosQ1: string
  custosQ1: string
  oportunidadeNegQ2: string
  custoQ2: string
  propostaValorQ2: string
  fonteReceitaQ2: string
  resultadoFinanceiroQ2: string
  contextoProblemaQ3: string
  publicoFocoImpactoQ3: string
  intervencoesQ3: string
  saidasQ3: string
  resultadosCurtoPrazoQ3: string
  resultadosMedioPrazoQ3: string
  visaoImpactoQ3: string
}
