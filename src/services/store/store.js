import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { burgerConstructorReducer } from "../reducers/burgerConstructorReducer";

import { thunk } from "redux-thunk";
import {notificationReducer} from "../reducers/notificationReducer";

const rootReducer = combineReducers({
    burgerConstructor: burgerConstructorReducer,
    notification: notificationReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);