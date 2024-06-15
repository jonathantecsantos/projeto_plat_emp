
export enum ImportType {
  student = 'ALUNO',
  evaluator = 'AVALIADOR'
}

export interface User {
  userId: number
  username: string
}


export interface Login {
  username: string,
  password: string,
}

export interface LoginResponse {
  data: {
    token: string;
    userId: number;
    username: string;
  };
  message: string;
}


export type UserId = Pick<User, 'userId'>;


export interface Token {
  token: string
  expirationDate?: Date
}

export interface AuthenticatedUser extends User {
  token?: Token
}


export interface AdaptedLoginResponse {
  payload: User;
  token: Token;
}