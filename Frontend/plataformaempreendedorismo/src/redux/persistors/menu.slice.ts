import { persistReducer } from "redux-persist"
import storage from "redux-persist/es/storage"
import menuSlice from "../reducers/menu.slice"

const persistConfig = {
  key: 'menuSlice',
  storage,
}

export const persistedMenuReducer = persistReducer(persistConfig, menuSlice)