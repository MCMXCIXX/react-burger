import {hideNotification, showNotification} from "../actions/notificationActions";

export const showNotificationThunk = (massage) => {
    return (dispatch, getState) => {
        const state = getState();
        dispatch(showNotification(massage))
        setTimeout(() => {
            dispatch(hideNotification(massage))
        }, state.notification.showTime)
    }
}