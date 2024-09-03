import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CheckIfTeamEvaluatedProps {
  evaluatedTeams: EvaluationState['evaluatedTeams'];
  teamId: number;
  evaluationType: string;
}

export interface EvaluationState {
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
      //salvar no cookie para obter no init state depois ao realizar novamente o login
    ) => {
      state.evaluatedTeams.push(action.payload);
    },
    clearEvaluations: (state) => {
      state.evaluatedTeams = [];  
    },
  },
});


export const selectEvaluatedTeams = (state: RootState) => state.evaluation.evaluatedTeams;

export const checkIfTeamEvaluated = ({
  evaluatedTeams,
  teamId,
  evaluationType,
}: CheckIfTeamEvaluatedProps): boolean => {
  return evaluatedTeams.some(
    (evaluation) =>
      evaluation.teamId === teamId && evaluation.evaluationType === evaluationType
  );
};

export const { addEvaluation, clearEvaluations } = evaluationsSlice.actions;

export default evaluationsSlice.reducer;
