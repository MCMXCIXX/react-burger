
export const ADD_INGREDIENT_TO_CONSTRUCTOR = "ADD_INGREDIENT_TO_CONSTRUCTOR";
export const DELETE_INGREDIENT_TO_CONSTRUCTOR = 'DELETE_INGREDIENT_TO_CONSTRUCTOR'
export const FETCH_INGREDIENTS_REQUEST = "FETCH_INGREDIENTS_REQUEST";
export const FETCH_INGREDIENTS_SUCCESS = "FETCH_INGREDIENTS_SUCCESS";
export const FETCH_INGREDIENTS_FAILURE = "FETCH_INGREDIENTS_FAILURE";
export const ADD_BUN_TO_CONSTRUCTOR = "ADD_BUN_TO_CONSTRUCTOR";
export const DELETE_BUN_TO_CONSTRUCTOR = 'DELETE_BUN_TO_CONSTRUCTOR';

const initialState = {
    ingredientData: {
        loading: false,
        messageError: '',
        ingredients: [],
    },
    ingredients: [],
    bun: null,
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
            const newCount = {...state.ingredientsCount};
            if(newCount[action.payload._id] > 1){
                newCount[action.payload._id] -= 1;
            } else {
               delete newCount[action.payload._id];
            }

            return {
                ...state,
                ingredients: state.ingredients.filter(ingredient => ingredient.id !== action.payload.id),
                ingredientsCount: newCount,
                totalPrice: state.totalPrice - action.payload.price
            }

        case FETCH_INGREDIENTS_REQUEST:
            return {
                ...state,
                ingredientData: {
                    ...state.ingredientData,
                    loading: true,
                }
            }

        case FETCH_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredientData: {
                    ...state.ingredientData,
                    ingredients: action.payload,
                    loading: false,
                }
            }
        case FETCH_INGREDIENTS_FAILURE:
            return {
                ...state,
                ingredientData: {
                    ...state.ingredientData,
                    loading: false,
                    messageError: action.payload,
                }
            }

        case ADD_BUN_TO_CONSTRUCTOR:
            return {
                ...state,
                bun: action.payload,
                ingredientsCount: {
                    ...state.ingredientsCount,
                    [action.payload._id]: (state.ingredientsCount[action.payload._id] || 0) + 2
                },
                totalPrice: state.totalPrice + action.payload.price * 2,
            }

        case DELETE_BUN_TO_CONSTRUCTOR:
            return {
                ...state,
                bun: null,
                ingredientsCount: {
                    ...state.ingredientsCount,
                    [action.payload._id]: state.ingredientsCount[action.payload._id] > 2 ? state.ingredientsCount[action.payload._id] - 2 : false,
                },
                totalPrice: state.totalPrice - action.payload.price * 2,
            }
        default:
            return state;

    }
}