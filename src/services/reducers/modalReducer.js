import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    modalIsOpen: false,
    typeModal: null,
    props: {},
}


const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.modalIsOpen = true;
            state.typeModal = action.payload.typeModal;
            state.props = action.payload.props || {};
        },
        closeModal: (state, action) => {
            state.modalIsOpen = false;
            state.typeModal = null;
            state.props = {};
        }
    }
})
export const  {openModal, closeModal} = modalSlice.actions
export default modalSlice.reducer;

