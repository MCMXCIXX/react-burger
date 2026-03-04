import { burgerConstructorReducer } from "../reducers/burgerConstructorReducer";
import {notificationReducer} from "../reducers/notificationReducer";
import {configureStore} from "@reduxjs/toolkit";
import {debounce} from "../utils";
import {ingredientDataReducer} from "../reducers/ingredientDataReducer";

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

export const store = configureStore({
    reducer: {
        burgerConstructor: burgerConstructorReducer,
        notification: notificationReducer,
        ingredientData: ingredientDataReducer,
    },
    preloadedState: {
        burgerConstructor: loadStateFromLocalStorage(),

    }
})

const saveStateToLocalStorage = (state) =>{

    try {
        const currentState = JSON.stringify(state);
        localStorage.setItem("burgerConstructorState", currentState);
    }
     catch(err){
         console.error('Ошибка сохранения в localStorage', err);
     }
}

const debouncedSave = debounce(saveStateToLocalStorage, 1000);


store.subscribe(() => {
    const state = store.getState();

    debouncedSave(state.burgerConstructor);
});