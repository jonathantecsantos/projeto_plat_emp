export enum AnexoTypeDescription {
  CRONOGRAMA_CONSTRUCAO = 'CRONOGRAMA_CONSTRUCAO',
  ANEXO = 'ANEXO',
  MEMORIAL_DESCRITIVO = 'MEMORIAL_DESCRITIVO',
  ESQUEMA = 'ESQUEMA'
}

export interface TypeAnexoPrototype {
  id: number
  descricao: AnexoTypeDescription
}

export const AnexoTypes = {
  CRONOGRAMA_CONSTRUCAO: { id: 1, descricao: AnexoTypeDescription.CRONOGRAMA_CONSTRUCAO } as TypeAnexoPrototype,
  ANEXO: { id: 2, descricao: AnexoTypeDescription.ANEXO } as TypeAnexoPrototype,
  MEMORIAL_DESCRITIVO: { id: 3, descricao: AnexoTypeDescription.MEMORIAL_DESCRITIVO } as TypeAnexoPrototype,
  ESQUEMA: { id: 4, descricao: AnexoTypeDescription.ESQUEMA } as TypeAnexoPrototype,
}


export interface AnexoPrototype {
  id: number
  tipoAnexoPrototipo: TypeAnexoPrototype
  nomeAnexo: string
  caminhoAnexo: string
}


export interface Prototype {
  idEquipe: number
  instituicaoImpactoSocial: string
  problemaPrincipal: string
  propostaValor: string
  vantagemCompetitiva: string
  principaisNecessidades: string
  parcerias: string
  tipoApoio: string
}


export interface TeamPrototypeById {
  id: number;
  instituicaoImpactoSocial: string;
  problemaPrincipal: string;
  propostaValor: string;
  vantagemCompetitiva: string;
  principaisNecessidades: string;
  parcerias: string;
  tipoApoio: string;
  anexos: AnexoPrototype[];
}