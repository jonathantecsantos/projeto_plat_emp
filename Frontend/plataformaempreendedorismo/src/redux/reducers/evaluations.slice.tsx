import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface EvaluationState {
  evaluatedTeams: { teamId: number; evaluationType: string }[];
}

const initialState: EvaluationState = {
  evaluatedTeams: [],
};

export const evaluationsSlice = createSlice({
  name: "evaluations",
  initialState,
  reducers: {
    addEvaluation: (
      state,
      action: PayloadAction<{ teamId: number; evaluationType: string }>
      //salvar no cookie com tempo para obter no init state depois ao realizar novamente o login
    ) => {
      state.evaluatedTeams.push(action.payload);
    },
  },
});

export const { addEvaluation } = evaluationsSlice.actions;

export const selectEvaluatedTeams = (state: RootState) => state.evaluation.evaluatedTeams;

export default evaluationsSlice.reducer;
