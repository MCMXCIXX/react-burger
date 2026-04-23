import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ModalState {
    modalIsOpen: boolean;
    typeModal: string | null;
    modalTitle: string | null;
    props: Record<string, any>;
}

interface OpenModalPayload {
    typeModal: string;
    modalTitle: string;
    props?: Record<string, any>;
}

const initialState: ModalState = {
    modalIsOpen: false,
    typeModal: null,
    modalTitle: null,
    props: {},
}


const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<OpenModalPayload>) => {
            const payload = action?.payload ?? {};
            if (!payload.typeModal) return;

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
export const {openModal, closeModal} = modalSlice.actions
export default modalSlice.reducer;

