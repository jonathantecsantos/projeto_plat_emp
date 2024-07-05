import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CookieUtils } from 'essencials'
import { LoginResponse } from '../../utils/types';

const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

interface AuthState {
  isAuthenticated: boolean
  token: string | null
  profile: string | null //token usado no authmiddleware
  //adicionar autorização do usuario authenticado
}

const initialState: AuthState = {
  isAuthenticated: !!CookieUtils.getCookie('tk'),
  token: CookieUtils.getCookie('tk'),
  profile: null
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
      // CookieUtils.setCookie({ 'tk': result.data.token }, 1)
      // CookieUtils.setCookie({ 'un': result.data.username }, 1)
      state.token = action.payload.data.token
      state.profile = action.payload.data.profile
      state.isAuthenticated = true
    },
    logout(state) {
      deleteCookie('tk')
      state.isAuthenticated = false
      state.token = null
    },
  },
})

export const { checkAuth, login, logout } = authSlice.actions
export default authSlice.reducer
