import { configureStore } from "@reduxjs/toolkit";
import loadingBarReducer from './reducers/loadingBar.slice';
import { studentsImport } from "../api/studentsImport.Slice";
import { evaluatorsImport } from "../api/evaluatorsImport.Slice";


export const store = configureStore({
  reducer: {
    loadingBarState: loadingBarReducer,
    [studentsImport.reducerPath]: studentsImport.reducer,
    [evaluatorsImport.reducerPath]: evaluatorsImport.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(studentsImport.middleware, evaluatorsImport.middleware)
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>