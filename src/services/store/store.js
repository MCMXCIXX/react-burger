import {combineReducers, createStore, compose} from "redux";
import {burgerConstructorReducer} from "../reducers/burgerConstructorReducer";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    burgerConstructor:  burgerConstructorReducer,
})

export const store = createStore(rootReducer, composeEnhancers())