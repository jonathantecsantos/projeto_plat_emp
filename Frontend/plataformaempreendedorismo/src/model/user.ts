export interface UserSettings {
  emailUsuario: string
  senhaAntiga: string
  novaSenha: string
}

export interface PasswordResetRequest {
  idObjeto: number
  emailUsuario: string
  role: string
}

export interface PasswordResetResponse {
  login: string
  senha: string
}