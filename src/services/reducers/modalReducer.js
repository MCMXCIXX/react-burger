import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    modalIsOpen: false,
    typeModal: null,
    modalTitle: null,
    props: {},
}


const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action) => {
            const payload = action?.payload ?? {};
            if(!payload.typeModal) return;

            state.modalIsOpen = true;
            state.typeModal = action.payload.typeModal;
            state.modalTitle = action.payload.modalTitle;
            state.props = action.payload.props || {};
        },
        closeModal: (state) => {
            state.modalIsOpen = false;
            state.typeModal = null;
            state.modalTitle = null;
            state.props = {};
        }
    }
})
export const  {openModal, closeModal} = modalSlice.actions
export default modalSlice.reducer;

