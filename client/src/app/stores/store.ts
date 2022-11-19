import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './modalStore';
import userReducer from './userStore';
import tripReducer from './tripStore';

export default configureStore({
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