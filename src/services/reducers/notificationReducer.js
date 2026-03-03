import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    notificationMessage: null,
    isShow: false,
    showTime: 2500,
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification: (state, action) => {
            state.isShow = true;
            state.notificationMessage = action.payload;
        },
        hideNotification: (state, action) => {
            state.isShow = false;
            state.notificationMessage = null;
        }
    },
})


export const showNotificationWithTimeout  = (message) => {
    return (dispatch, getState) => {
        const state = getState();
        dispatch(showNotification(message))
        setTimeout(() => {
            dispatch(hideNotification())
        }, state.notification.showTime)
    }
}

export const {showNotification, hideNotification} = notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;