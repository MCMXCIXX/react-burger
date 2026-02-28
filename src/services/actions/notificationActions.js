
import {HIDE_NOTIFICATION, SHOW_NOTIFICATION} from "../reducers/notificationReducer";

export const showNotification = (message) => {
    return {
        type: SHOW_NOTIFICATION,
        payload: message
    }
}

export const hideNotification = () => {
    return {
        type: HIDE_NOTIFICATION,
    }
}