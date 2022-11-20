import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './modalStore';
import userReducer from './userStore';
import tripReducer from './tripStore';
import { enableMapSet } from 'immer'

enableMapSet()
export const store = configureStore({
  reducer: {
    modal: modalReducer,
    users: userReducer,
    trips: tripReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch