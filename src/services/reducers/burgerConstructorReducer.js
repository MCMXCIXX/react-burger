import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    ingredients: [],
    bun: null,
    totalPrice: 0,
    ingredientsCount: {},
    maxRequiredIngredients: 2,
}

export const burgerConstructorSlice = createSlice({
    name: "burgerConstructor",
    initialState,
    reducers: {
        addConstructorIngredient(state, action) {
            state.ingredients.push(action.payload);
            state.ingredientsCount[action.payload._id] = (state.ingredientsCount[action.payload._id] || 0) + 1;
            state.totalPrice += action.payload.price;
        },
        deleteConstructorIngredient(state, action) {
            state.ingredients = state.ingredients.filter((item) => item.id !== action.payload.id);
            state.totalPrice = state.totalPrice - action.payload.price;
            const currentItemId = action.payload._id;
            if (state.ingredientsCount[currentItemId] - 1 !== 0) {
                state.ingredientsCount[currentItemId] -= 1;
            } else {
                delete state.ingredientsCount[currentItemId];
            }
        },
        addBunToConstructor(state, action) {
            state.bun = (action.payload);
            state.ingredientsCount[action.payload._id] = (state.ingredientsCount[action.payload._id] || 0) + 2;
            state.totalPrice += action.payload.price * 2;
        },
        deleteBunToConstructor(state, action) {
            state.bun = null;
            state.totalPrice -= action.payload.price * 2;
            delete state.ingredientsCount[action.payload._id];
        }
    }
})

export const {
    addConstructorIngredient,
    deleteConstructorIngredient,
    addBunToConstructor,
    deleteBunToConstructor
} = burgerConstructorSlice.actions;


export const burgerConstructorReducer = burgerConstructorSlice.reducer;