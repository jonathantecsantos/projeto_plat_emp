import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import userInfoSlice from '../reducers/userInfo.slice'

const persistConfig = {
  key: 'userInfo',
  storage,
}

export const persistedUserLoginReducer = persistReducer(persistConfig, userInfoSlice)