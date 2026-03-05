import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    modalIsOpen: false,
    content: null,
}


const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.modalIsOpen = true;
            state.content = action.payload;
        },
        closeModal: (state, action) => {
            state.modalIsOpen = false;
            state.content = null;
        }
    }
})
export const  {openModal, closeModal} = modalSlice.actions
export default modalSlice.reducer;

