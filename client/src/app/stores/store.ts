import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './modalStore';
import userReducer from './userStore';

export default configureStore({
  reducer: {
    modal: modalReducer,
    users: userReducer 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
})