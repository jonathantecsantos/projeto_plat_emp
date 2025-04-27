import { TeamEvaluation, TeamEvaluationResponse } from "../model/evaluationFormat"

export enum ImportType {
  student = 'ALUNO',
  evaluator = 'AVALIADOR',
  teacher = 'PROFESSOR',
  coordinator = 'COORDENADOR'
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

export const formatDateToInput = (isoDate: string): string => {
  if (!isoDate) return "" // Retorna vazio se a data não for válida
  return new Date(isoDate).toISOString().split("T")[0]
}

export interface EvaluationProps {
  teamData: { id: number, nomeEquipe?: string, teams: TeamEvaluationResponse[], teamEvaluation: TeamEvaluation }
}

export const normalizePath = (path: string): string => path.replace(/\\/g, '\\\\')

export const replacePath = (path: string, folder: string, apiUrl: string): string => {
  const normalizedFolder = folder.endsWith('\\\\') ? folder : `${folder}\\\\`
  return path.replace(new RegExp(`^${normalizedFolder}`), `${apiUrl}/uploads/`)
}

export const formatCPF = (cpf: string) => cpf.replace(/[^\d]/g, '')

export const capitalizeTeamName = (name: string) => {
  return name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : ''
}

export const ActivityTypes = [
  { value: 'produtos_inovadores', label: 'Produtos inovadores em qualquer área do conhecimento' },
  { value: 'servicos_inovadores', label: 'Serviços inovadores em qualquer área do conhecimento' },
  { value: 'automacao_robotica_drones', label: 'Automação, robótica, aplicação de drones' },
  { value: 'jogos_educacionais', label: 'Jogos educacionais analógicos e / ou digitais' },
  { value: 'desenvolvimento_sustentavel', label: 'Atividades para o desenvolvimento sustentável com tecnologias sociais' },
  { value: 'atividades_culturais', label: 'Atividades culturais inovadoras (peça teatral, stand-up, espetáculo de dança, banda ou grupo musical)' },
  { value: 'plataformas_blogs_podcasts', label: 'Plataformas Blogs Podcasts' },
  { value: 'aplicativos', label: 'Aplicativos para Smartphones, Tablets, TVs' },
  { value: 'internet_das_coisas', label: 'Internet das Coisas (aplicações para Alexa / Google Home)' },
  { value: 'inovacoes_ia', label: 'Inovações assistidas por Inteligência Artificial' },
  { value: 'outras_atividades', label: 'Entre outras atividades (propostas / soluções) inovadoras' }
] as const

export type ActivityTypeValue = typeof ActivityTypes[number]['value']

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