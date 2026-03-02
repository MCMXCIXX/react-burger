import { burgerConstructorReducer } from "../reducers/burgerConstructorReducer";
import {notificationReducer} from "../reducers/notificationReducer";
import {configureStore} from "@reduxjs/toolkit";
import {debounce} from "../utils";

const loadStateFromLocalStorage = () => {
    const state = localStorage.getItem("burgerConstructorState");
    if (state === null) {

        return undefined;
    }

    try {
        return JSON.parse(state);
    } catch (err) {
        console.error('Ошибка парсинга состояния из localStorage', err);
        return undefined;
    }
}
const preloadedState = loadStateFromLocalStorage();

export const store = configureStore({
    reducer: {
        burgerConstructor: burgerConstructorReducer,
        notification: notificationReducer,
    },
    preloadedState: {
        burgerConstructor: loadStateFromLocalStorage(),

    }
})

const saveStateFromLocalStorage = (state) =>{
    const currentState = JSON.stringify(state);
    localStorage.setItem("burgerConstructorState", currentState);
}

const debouncedSave = debounce(saveStateFromLocalStorage, 1000);


store.subscribe(() => {
    const state = store.getState();

    debouncedSave(state.burgerConstructor);
});