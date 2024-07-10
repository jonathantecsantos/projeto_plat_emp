import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CookieUtils } from 'essencials';
import { LoginResponse } from '../../utils/types';


interface AuthState {
  isAuthenticated: boolean
  token: string | null
  profile: string | null 
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
      CookieUtils.deleteCookie('tk')
      state.isAuthenticated = false
      state.token = null
    },
  },
})

export const { checkAuth, login, logout } = authSlice.actions
export default authSlice.reducer
