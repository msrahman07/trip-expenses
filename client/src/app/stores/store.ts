import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './modalStore';

export default configureStore({
  reducer: {
    modal: modalReducer
  }
})