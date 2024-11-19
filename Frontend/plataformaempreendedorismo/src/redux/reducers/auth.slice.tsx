import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CookieUtils } from 'essencials';
import { jwtDecode } from 'jwt-decode';
import { LoginResponse } from '../../utils/types';


interface DecodedToken {
  exp: number;
  iat: number;
  sub: string;
  enumRole: 'ROLE_ADMIN' | 'ROLE_ALUNO' | 'ROLE_PROFESSOR' | 'ROLE_COORDENADOR' | 'ROLE_AVALIADOR';
}


interface AuthState {
  isAuthenticated: boolean
  token: string | null
  profile: string | null
  enumRole  : string | null
}

const initialState: AuthState = {
  isAuthenticated: !!CookieUtils.getCookie('tk'),
  token: CookieUtils.getCookie('tk'),
  profile: null,
  enumRole: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkAuth(state) {
      const token = CookieUtils.getCookie('tk')
      state.isAuthenticated = !!token
      state.token = token
    },
    login(state, action: PayloadAction<LoginResponse>) {
      state.token = action.payload.tokenJWT
      state.isAuthenticated = true
      try {
        const decoded: DecodedToken = jwtDecode(action.payload.tokenJWT);
        console.log('decoded', decoded)
        state.enumRole = decoded.enumRole
        state.profile = decoded.enumRole
      } catch (error) {
        console.error('Erro ao decodificar o token', error);
      }
    },
    logout(state) {
      CookieUtils.deleteCookie('tk')
      CookieUtils.deleteCookie('un')
      state.isAuthenticated = false
      state.token = null
      state.enumRole = null
      state.profile = null
    },
  },
})

export const { checkAuth, login, logout } = authSlice.actions
export default authSlice.reducer
