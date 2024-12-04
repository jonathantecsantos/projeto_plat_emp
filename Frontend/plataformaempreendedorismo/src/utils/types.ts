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

export interface EvaluationTypes {
  id: number
  descricao: string
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
  idEquipe: number | null
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

export const formatDateToInput = (isoDate: string): string => {
  if (!isoDate) return ""; // Retorna vazio se a data não for válida
  return new Date(isoDate).toISOString().split("T")[0]
}

export interface EvaluationProps {
  teamData: { id: number, nomeEquipe?: string, teams: TeamEvaluationResponse[], teamEvaluation: TeamEvaluation }
}
export const placeholderImages = [
  "https://plus.unsplash.com/premium_photo-1731951688289-1de7eb23bdd1?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1732572854523-f330af9a72ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDl8fHBob3RvfGVufDB8fHx8MTY5NzgwMjM5Mw&ixlib=rb-4.0.3&q=80&w=400",
  "https://images.unsplash.com/photo-1731963914155-d22942204d3d?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export const avatarImage =
  "https://www.zarla.com/images/zarla-floralma-1x1-2400x2400-20220923-3t4w93gk3y6mw8vhx48w.png?crop=1:1,smart&width=250&dpr=2";



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