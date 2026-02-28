import {
    ADD_BUN_TO_CONSTRUCTOR,
    ADD_INGREDIENT_TO_CONSTRUCTOR, DELETE_BUN_TO_CONSTRUCTOR,
    DELETE_INGREDIENT_TO_CONSTRUCTOR, FETCH_INGREDIENTS_FAILURE,
    FETCH_INGREDIENTS_REQUEST, FETCH_INGREDIENTS_SUCCESS
} from "../reducers/burgerConstructorReducer";

export const addConstructorIngredient = (newIngredient) => {
    return {
        type: ADD_INGREDIENT_TO_CONSTRUCTOR,
        payload: newIngredient
    }
}

export const deleteConstructorIngredient = (ingredient) => {
    return {
        type: DELETE_INGREDIENT_TO_CONSTRUCTOR,
        payload: {...ingredient}
    }
}

export const fetchIngredientsRequest = () => {
    return {
        type: FETCH_INGREDIENTS_REQUEST,
    }
}

export const fetchIngredientsSuccess = (ingredientsArray) => {
    return {
        type: FETCH_INGREDIENTS_SUCCESS,
        payload: ingredientsArray,
    }
}

export const fetchIngredientsFailure = (message) => {
    return {
        type: FETCH_INGREDIENTS_FAILURE,
        payload: message,
    }
}

export const addBunToConstructor = (bun) => {
    return {
        type: ADD_BUN_TO_CONSTRUCTOR,
        payload: bun
    }
}

export const deleteBunToConstructor = (bun) => {
    return {
        type: DELETE_BUN_TO_CONSTRUCTOR,
        payload: bun,
    }
}