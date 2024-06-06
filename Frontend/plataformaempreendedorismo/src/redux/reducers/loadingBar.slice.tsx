import { createSlice } from "@reduxjs/toolkit";

export const loadingBarSlice = createSlice({
  name: 'loadingBarSlice',
  initialState: false,
  reducers: {
    toggleLoading: (state) => !state
  }
})

export const { toggleLoading } = loadingBarSlice.actions
export default loadingBarSlice.reducer