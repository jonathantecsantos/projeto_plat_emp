import { persistReducer } from "redux-persist"
import storage from "redux-persist/es/storage"
import tableSlice from "../reducers/table.slice"

const persistConfig = {
  key: 'table',
  storage,
}

export const persistedTableReducer = persistReducer(persistConfig, tableSlice)