import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse } from '../../utils/types';


const initialState: LoginResponse = {
  data: {
    token: '',
    userId: 0,
    username: '',
  },
  message: ""
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
