import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { evaluatorsImport } from "../api/evaluatorsImport.Slice";
import { studentsImport } from "../api/studentsImport.Slice";
import { userApiSlice } from "../api/userApi.slice";
import { persistedAuthReducer } from './persistors/auth.slice';
import { persistedUserLoginReducer } from "./persistors/userInfo.slice";
import loadingBarReducer from './reducers/loadingBar.slice';


export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    loadingBarState: loadingBarReducer,
    userInfo: persistedUserLoginReducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [studentsImport.reducerPath]: studentsImport.reducer,
    [evaluatorsImport.reducerPath]: evaluatorsImport.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      studentsImport.middleware,
      evaluatorsImport.middleware,
      userApiSlice.middleware,

    )
  }
})

export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>