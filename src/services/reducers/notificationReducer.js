export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

const initialState = {
    notificationmessage: null,
    isShow: false,
    showTime: 2500,
}


export const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_NOTIFICATION:
            return {
                ...state,
                isShow: true,
                notificationmessage: action.payload,
            }

        case HIDE_NOTIFICATION:
            return {
                ...state,
                isShow: false,
                notificationmessage: null,
            }
        default:
            return state;

    }
}