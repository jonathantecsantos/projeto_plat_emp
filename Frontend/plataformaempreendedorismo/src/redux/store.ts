import { configureStore } from "@reduxjs/toolkit";

import loadingBarReducer from './reducers/loadingBar.slice';
import { studentsImport } from "../api/studentsImport.Slice";


export const store = configureStore({
  reducer: {
    loadingBarState: loadingBarReducer,
    [studentsImport.reducerPath]: studentsImport.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(studentsImport.middleware)
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>