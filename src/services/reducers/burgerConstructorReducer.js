import {combineReducers} from "redux";

export const ADD_INGREDIENT_TO_CONSTRUCTOR = "ADD_INGREDIENT_TO_CONSTRUCTOR";
export const DELETE_INGREDIENT_TO_CONSTRUCTOR = 'DELETE_INGREDIENT_TO_CONSTRUCTOR'


const initialState = {
    ingredients: [],
    totalPrice: 0,
    ingredientsCount: {},
    maxRequiredIngredients: 2,

}

export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT_TO_CONSTRUCTOR:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload],
                ingredientsCount: {
                    ...state.ingredientsCount,
                    [action.payload._id]: (state.ingredientsCount[action.payload._id] || 0) + 1
                },
                totalPrice: state.totalPrice + action.payload.price
            }

            case DELETE_INGREDIENT_TO_CONSTRUCTOR:
                return {
                    ...state,
                    ingredients: state.ingredients.filter(ingredient => ingredient.id !== action.payload.id),
                    ingredientsCount: {
                        ...state.ingredientsCount,
                        [action.payload._id]: state.ingredientsCount[action.payload._id] > 1 ? state.ingredientsCount[action.payload._id] - 1 : false,
                    },
                    totalPrice: state.totalPrice - action.payload.price
                }

        default:
            return state;

    }
}