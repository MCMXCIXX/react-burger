
import {HIDE_NOTIFICATION, SHOW_NOTIFICATION} from "../reducers/notificationReducer";

export const showNotification = (massage) => {
    return {
        type: SHOW_NOTIFICATION,
        payload: massage
    }
}

export const hideNotification = () => {
    return {
        type: HIDE_NOTIFICATION,
    }
}