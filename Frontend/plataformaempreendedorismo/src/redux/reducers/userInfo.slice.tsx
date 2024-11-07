import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse } from '../../utils/types';


const initialState: LoginResponse = {
  tokenJWT: '',
  email: '',
  exp: '',
  id: 0,
  username: ''
}

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo(_state, action: PayloadAction<LoginResponse>) {
      return action.payload;
    },
    clearUserInfo(_state) {
      return initialState;
    },
  },
});

export const { setUserInfo, clearUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
