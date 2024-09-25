export interface TypeAnexoPrototype {
  id: number
  descricao: string
}


export interface AnexoPrototype {
  id: number
  tipoAnexoPrototipo: TypeAnexoPrototype
  nomeAnexo: string
  caminhoAnexo: string
}


export interface Prototype {
  id: number
  anexos: AnexoPrototype[]
  instituicaoImpactoSocial: string
  problemaPrincipal: string
  propostaValor: string
  vantagemCompetitiva: string
  principaisNecessidades: string
  parcerias: string
  tipoApoio: string
}