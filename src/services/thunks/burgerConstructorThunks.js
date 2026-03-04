import {addConstructorIngredient, addBunToConstructor, switchBun} from "../reducers/burgerConstructorReducer";
import {showNotificationWithTimeout} from "../reducers/notificationReducer";

const requiredType = 'bun'


const findIngredientThunk = (id) => {

    return (getState) => {
        const state = getState();
        const baseIngredient = state.ingredientData.ingredients.find(ingredient => ingredient._id === id)

        if (baseIngredient) {
            const newBaseIngredient = {
                ...baseIngredient,
                id: crypto.randomUUID(),
            }
            return newBaseIngredient
        } else {
            return null
        }
    }
}

export const addIngredientsThunk = (id) => {

    return (dispatch, getState) => {
        const state = getState();
        const ingredientObject = findIngredientThunk(id)(getState);
        const RequiredIngredientsInConstructor = state.burgerConstructor.bun;


        if (!ingredientObject) {
            dispatch(showNotificationWithTimeout(`Ингредиент с ID ${id} не найден.`))
            return
        }


        if (ingredientObject.type === requiredType) {
            if (!RequiredIngredientsInConstructor) {
                dispatch(addBunToConstructor(ingredientObject));

            } else {

                dispatch(switchBun(ingredientObject))

            }
        }

        if (ingredientObject.type !== requiredType) {
            dispatch(addConstructorIngredient(ingredientObject));


        }
    }


};