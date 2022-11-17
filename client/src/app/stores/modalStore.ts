import { createSlice } from "@reduxjs/toolkit"

export const modalStore = createSlice({
    name: 'modal',
    initialState: {
      open: false,
      content: null,
    },
    reducers: {
      openModal: (state, action) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.open = true
        state.content = action.payload
      },
      closeModal: (state) => {
        state.open = false
      },
    },
});

export const { openModal, closeModal } = modalStore.actions;
  
export const modalState = (state:any) => state.modal.open;
export const modalContent = (state:any) => state.modal.content;
  
export default modalStore.reducer;