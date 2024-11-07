import { TeamEvaluation, TeamEvaluationResponse } from "../model/evaluationFormat"

export enum ImportType {
  student = 'ALUNO',
  evaluator = 'AVALIADOR',
  teacher = 'PROFESSOR'
}


export enum Roles {
  Admin = 'ROLE_ADMIN',
  Aluno = 'ROLE_ALUNO',
  Professor = 'ROLE_PROFESSOR',
  Coordenador = 'ROLE_COORDENADOR',
  Avaliador = 'ROLE_AVALIADOR',
}

export enum EvalutionType {
  DLJ = 1,
  PITCH = 2,
  SHARKTANK = 3,
  EXPODLEI = 4,
}

export interface User {
  userId: number
  username: string
}


export interface Login {
  login: string
  senha: string
}

// export interface LoginResponse {
//   data: {
//     token: string
//     id: number
//     username: string
//     profile: string
//   }
//   message: string
// }
export interface LoginTokenJWT {
  id: number
  email: string
  username: string
  enumRole?: Roles
  exp: string
}

export interface LoginResponse extends LoginTokenJWT {
  tokenJWT: string
}

export type UserId = Pick<User, 'userId'>


export interface Token {
  token: string
  expirationDate?: Date
}

export interface AuthenticatedUser extends User {
  token?: Token
}


export interface AdaptedLoginResponse {
  payload: User
  token: Token
}

export interface EvaluationProps {
  teamData: { id: number, nomeEquipe?: string, teams: TeamEvaluationResponse[], teamEvaluation: TeamEvaluation }
}

export const formatCPF = (cpf: string) => cpf.replace(/[^\d]/g, '')

export const capitalizeTeamName = (name: string) => {
  return name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : '';
};


export const Institutions = [
  'Abrigo de Animais Arca do Tota',
  'APAE',
  'Associação Casa de Acolhida Maria Rosa Mística',
  'Associação Casa de Acolhida Nossa Senhora de Lourdes',
  'Associação dos Amigos dos Animais Abandonados de Campina Grande (A4)',
  'Casa da Criança Drº João Moura',
  'Casa da Lili',
  'Casa de Acolhida São Paulo da Cruz',
  'Casa do Menino',
  'Casa São Domingos Sávio',
  'CENTRAC - Centro de Arte e Cultura',
  'Centro de Recuperação Homens de Cristo',
  'Comissão Pastoral da Terra – CPT',
  'COTRAMARE - Cooperativa de Trabalhadores de Materiais Recicláveis',
  'Fazenda do Sol',
  'Fraternidade Irmãos de Francisco',
  'Hospital da FAP',
  'Instituto dos Cegos',
  'Instituto Nacional do Semiárido - INSA',
  'Ismi Social',
  'Lar da Sagrada Face',
  'Lar Doce Aconchego',
  'Movimento dos Atingidos pela Barragem de Acauã',
  'Pastoral da Criança',
  'Pastoral da Mulher',
  'Pastoral da Pessoa Idosa',
  'Pastoral da Saúde',
  'Pastoral da Sobriedade',
  'Pastoral das Necessidades Especiais (Surdos, cegos, cadeirantes, etc)',
  'Pastoral de Acesso à Justiça e Direitos Humanos',
  'Pastoral de Pessoas em Situação de Rua',
  'Pastoral Operária',
  'PATAC - Programa de Aplicação de Tecnologia Apropriada às Comunidades',
  'PEASA - Programa de Estudos e Ações para o Semiárido',
  'Répteis da Caatinga',
  'Santuário da Divina Misericórdia',
  'São Vicente de Paulo',
]