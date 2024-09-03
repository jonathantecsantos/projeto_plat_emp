import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import evaluationSlice from '../reducers/evaluations.slice'


const persistConfig = {
  key: "evaluation",
  storage,
};

export const persistedEvaluationReducer = persistReducer(persistConfig, evaluationSlice)