import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CookieUtils } from 'essencials'

interface AuthState {
  isAuthenticated: boolean
  token: string | null // Adicionando o token ao estado
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
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
    login(state, action: PayloadAction<string>) {
      const token = action.payload
      CookieUtils.setCookie({ 'tk': token }, 1)
      state.isAuthenticated = true
      state.token = token
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
