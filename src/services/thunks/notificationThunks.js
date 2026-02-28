import {hideNotification, showNotification} from "../actions/notificationActions";

export const showNotificationThunk = (message) => {
    return (dispatch, getState) => {
        const state = getState();
        dispatch(showNotification(message))
        setTimeout(() => {
            dispatch(hideNotification())
        }, state.notification.showTime)
    }
}