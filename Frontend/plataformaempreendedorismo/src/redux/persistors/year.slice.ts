import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import yearSlice from "../reducers/year.slice";

const persistConfig = {
  key: "yearSlice",
  storage,
};

export const persistedYearReducer = persistReducer(persistConfig, yearSlice);
