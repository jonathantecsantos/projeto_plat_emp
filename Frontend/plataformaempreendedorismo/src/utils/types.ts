import { TeamsResponse } from "../model/team"

export enum ImportType {
  student = 'ALUNO',
  evaluator = 'AVALIADOR',
  teacher = 'PROFESSOR'
}

export interface User {
  userId: number
  username: string
}


export interface Login {
  username: string
  password: string
}

export interface LoginResponse {
  data: {
    token: string
    userId: number
    username: string
    profile: string
  }
  message: string
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
  teamData: { id: number, nomeEquipe?: string, teams: TeamsResponse[] }
}

export const formatCPF = (cpf: string) => cpf.replace(/[^\d]/g, '')

export const capitalizeTeamName = (name: string) => {
  return name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : '';
};


// interface CheckIfTeamEvaluatedProps {
//   evaluatedTeams: EvaluationState['evaluatedTeams'];
//   teamId: number;
//   evaluationType: string;
// }

// export const checkIfTeamEvaluated = ({
//   evaluatedTeams,
//   teamId,
//   evaluationType
// }: CheckIfTeamEvaluatedProps): boolean => {
//   return evaluatedTeams.some(
//     (evaluation) =>
//       evaluation.teamId === teamId &&
//       evaluation.evaluationType === evaluationType
//   );
// };