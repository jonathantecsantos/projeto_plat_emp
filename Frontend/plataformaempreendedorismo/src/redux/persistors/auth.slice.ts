import { persistReducer } from "redux-persist"
import storage from "redux-persist/es/storage"
import authReducer from '../reducers/auth.slice'

const persistConfig = {
  key: 'auth',
  storage,
}

export const persistedAuthReducer = persistReducer(persistConfig, authReducer)