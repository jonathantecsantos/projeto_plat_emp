import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface YearState {
  selectedYear: number;
}

const initialState: YearState = {
  selectedYear: new Date().getFullYear(),
};

const yearSlice = createSlice({
  name: "yearSlice",
  initialState,
  reducers: {
    setYear: (state, action: PayloadAction<number>) => {
      state.selectedYear = action.payload;
    },
  },
});

export const { setYear } = yearSlice.actions;

export default yearSlice.reducer;
