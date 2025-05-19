import { TeamEvaluation, TeamEvaluationResponse } from "../model/evaluationFormat"
import { Ods } from "../model/ods"
import { ZodSchema } from "zod"

export enum ImportType {
  student = 'ALUNO',
  evaluator = 'AVALIADOR',
  teacher = 'PROFESSOR',
  coordinator = 'COORDENADOR'
}

export const validateSchema = <T>(
  schema: ZodSchema<T>,
  data: unknown,
  notify: (msg: string) => void
): { success: true; data: T } | { success: false } => {
  const result = schema.safeParse(data)

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors as Record<string, string[] | undefined>;

    Object.entries(fieldErrors).forEach(([_field, messages]) => {
      if (Array.isArray(messages) && messages.length > 0) {
        notify(`${messages[0]}`)
      }
    })

    return { success: false }
  }

  return { success: true, data: result.data }
};


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
  idEquipe: number[] //Teacher pode ter mais de um id de equipe
  email: string
  username: string
  enumRole?: Roles
  tipoAvaliacaoList?: string[]
  exp: string
}

export interface UploadProps {
  userID: number,
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

export interface TeamValidation {
  ods: Ods[]
  activitties: { id: number }[]
  institution: { id: number }[]
}

export const formatDateToInput = (isoDate: string): string => {
  if (!isoDate) return "" 
  return new Date(isoDate)?.toISOString()?.split("T")[0]
}

export function maskCPF(cpf: string): string {
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}

export interface EvaluationProps {
  teamData: { id: number, nomeEquipe?: string, teams: TeamEvaluationResponse[], teamEvaluation: TeamEvaluation }
}

export const normalizePath = (path: string): string => path?.replace(/\\/g, '\\\\')

export const replacePath = (path: string, folder: string, apiUrl: string): string => {
  const normalizedFolder = folder?.endsWith('\\\\') ? folder : `${folder}\\\\`
  return path?.replace(new RegExp(`^${normalizedFolder}`), `${apiUrl}/uploads/`)
}

export const getImageUrl = (path: string, folder: string, apiUrl: string): string => {
  if (path?.startsWith('http://') || path?.startsWith('https://')) {
    return path;
  }

  if (import.meta.env.DEV) {
    return replacePath(normalizePath(path), folder, apiUrl)
  }

  return `${apiUrl}${path?.startsWith('/') ? path : `/${path}`}`;
}

export const formatCPF = (cpf: string) => cpf.replace(/[^\d]/g, '')

export const capitalizeTeamName = (name: string) => {
  return name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : ''
}
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

export const formatDateForInput = (date?: Date | string): string => {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) return '';

  const offset = dateObj.getTimezoneOffset() * 60000;
  const localDate = new Date(dateObj.getTime() - offset);

  return localDate.toISOString().split('T')[0]; // 'yyyy-MM-dd'
}

export const ClassesSelectTypes = [
  "1ª Série A",
  "1ª Série B",
  "1ª Série C",
  "2ª Série A",
  "2ª Série B",
  "2ª Série C",
  "3ª Série A",
  "3ª Série B",
  "3ª Série C",
  "TECINFO"
] as const

export type ClassesTypes = typeof ClassesSelectTypes[number]


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