import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface NotificationState {
    notificationMessage: string | null;
    isShow: boolean;
    showTime: number;
}

const initialState: NotificationState = {
    notificationMessage: null,
    isShow: false,
    showTime: 2500,
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification: (state, action: PayloadAction<string>) => {
            state.isShow = true;
            state.notificationMessage = action.payload;
        },
        hideNotification: (state) => {
            state.isShow = false;
            state.notificationMessage = null;
        }
    },
})

let hideNotificationTimerId: ReturnType<typeof setTimeout> | null = null;

export const showNotificationWithTimeout  = (message: string) => {
    return (dispatch: any, getState: any) => {
        const state = getState();
        dispatch(showNotification(message))
        if(hideNotificationTimerId){
            clearTimeout(hideNotificationTimerId);
        }
        hideNotificationTimerId = setTimeout(() => {
            dispatch(hideNotification())
        }, state.notification.showTime)
    }
}

export const {showNotification, hideNotification} = notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;
