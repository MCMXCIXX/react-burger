export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

const initialState = {
    notificationMassage: null,
    isShow: false,
    showTime: 2500,
}


export const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_NOTIFICATION:
            return {
                ...state,
                isShow: true,
                notificationMassage: action.payload,
            }

        case HIDE_NOTIFICATION:
            return {
                ...state,
                isShow: false,
                notificationMassage: null,
            }
        default:
            return state;

    }
}