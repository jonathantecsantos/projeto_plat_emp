import { createSlice } from "@reduxjs/toolkit";

export interface MenuState {
  isOpen: boolean
}

const initialState: MenuState = {
  isOpen: true,
}

const menuSlice = createSlice({
  name: "menuSlice",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen
    },
  },
});

export const { toggleMenu } = menuSlice.actions

export default menuSlice.reducer