import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CookieUtils } from 'essencials';

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkAuth(state) {
      const token = CookieUtils.getCookie('tk');
      state.isAuthenticated = !!token;
    },
    login(state, action: PayloadAction<string>) {
      const token = action.payload;
      CookieUtils.setCookie({ 'tk': token }, 1);
      state.isAuthenticated = true;
    },
    logout(state) {
      CookieUtils.deleteCookie('tk');
      state.isAuthenticated = false;
    },
  },
});

export const { checkAuth, login, logout } = authSlice.actions;
export default authSlice.reducer;
