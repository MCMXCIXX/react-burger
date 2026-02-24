import {ADD_INGREDIENT_TO_CONSTRUCTOR, DELETE_INGREDIENT_TO_CONSTRUCTOR} from "../reducers/burgerConstructorReducer";
import ingredientsData from "../../data";

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