import {
    addBunToConstructor,
    addConstructorIngredient,
    fetchIngredientsFailure,
    fetchIngredientsRequest,
    fetchIngredientsSuccess
} from "../actions/burgerCosntructorActions";
import {showNotificationThunk} from "./notificationThunks";

const URL = "https:raw.githubusercontent.com/MCMXCIXX/burger-ingredients-db/refs/heads/main/ingredients.json";
const requiredType = 'bun'



export const fetchIngredientsData = () => {
    return (dispatch) => {
        dispatch(fetchIngredientsRequest());

        fetch(URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Не удалось загрузить данные. Статус: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                dispatch(fetchIngredientsSuccess(data));
            })
            .catch(err => {
                const message = err.message || 'Неизвестная ошибка загрузки';
                console.error(message);
                dispatch(fetchIngredientsFailure(message));
            });
    }
}


const findIngredientThunk = (id) => {

    return (getState) => {
        const state = getState();
        const baseIngredient = state.burgerConstructor.ingredientData.ingredients.find(ingredient => ingredient._id === id)

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
            // showNotification(`Ингредиент с ID ${id} не найден.`)
            return
        }


        if (ingredientObject.type === requiredType) {
            if (!RequiredIngredientsInConstructor) {
                dispatch(addBunToConstructor(ingredientObject));

            } else {
                dispatch(showNotificationThunk('Достигнут лимит булок.'))

            }
        }

        if (ingredientObject.type !== requiredType) {
            if (RequiredIngredientsInConstructor?.length > 0) {
                // showNotification("Сначала добавьте булку, чтобы начать сборку.", 2500);
                return;
            }

            dispatch(addConstructorIngredient(ingredientObject));
        }
    }


};