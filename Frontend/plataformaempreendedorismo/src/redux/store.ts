import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from '@reduxjs/toolkit/query'
import { persistStore } from "redux-persist"
import { studentsApiSlice } from "../api/studentApi"
import { teamApiSlice } from "../api/teamApi.slice"
import { userApiSlice } from "../api/userApi.slice"
import { persistedAuthReducer } from './persistors/auth.slice'
import { persistedUserLoginReducer } from "./persistors/userInfo.slice"
import { persistedEvaluationReducer } from './persistors/evaluations.slice'
import loadingBarReducer from './reducers/loadingBar.slice'


export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    loadingBarState: loadingBarReducer,
    userInfo: persistedUserLoginReducer,
    evaluation: persistedEvaluationReducer,
    [studentsApiSlice.reducerPath]: studentsApiSlice.reducer,
    [teamApiSlice.reducerPath]: teamApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      studentsApiSlice.middleware,
      teamApiSlice.middleware,
      userApiSlice.middleware,
    )
  }
})

setupListeners(store.dispatch)
export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>