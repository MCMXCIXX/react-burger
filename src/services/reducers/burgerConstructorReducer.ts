import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {request} from "../api";
import {Ingredient} from "../../types/ingredient";



interface ConstructorIngredient extends Ingredient {
    id: string;
}

interface BurgerConstructorState {
    ingredients: ConstructorIngredient[];
    bun: Ingredient | null;
    totalPrice: number;
    ingredientsCount: Record<string, number>;
    maxRequiredIngredients: number;
}

const initialState: BurgerConstructorState = {
    ingredients: [],
    bun: null,
    totalPrice: 0,
    ingredientsCount: {},
    maxRequiredIngredients: 2,
}

export const submitOrder = createAsyncThunk<number,string[] , {rejectValue: string}>(
    'order/submitOrder',
    async (ingredientIds, {rejectWithValue, getState}) => {
        try {
            const data = await request('/orders', {
                method: 'POST',
                body: JSON.stringify({ingredients: ingredientIds}),
            });
            return data.order.number;
        } catch (err) {
            return rejectWithValue((err as Error).message);
        }
    }
);

export const burgerConstructorSlice = createSlice({
    name: "burgerConstructor",
    initialState,
    reducers: {
        addConstructorIngredient(state, action: PayloadAction<ConstructorIngredient>) {
            state.ingredients.push(action.payload);
            state.ingredientsCount[action.payload._id] = (state.ingredientsCount[action.payload._id] || 0) + 1;
            state.totalPrice += action.payload.price;
        },
        deleteConstructorIngredient(state, action: PayloadAction<ConstructorIngredient>) {


            const exists = state.ingredients.some((item) => item.id === action.payload.id);
            if (!exists) return;

            state.ingredients = state.ingredients.filter((item) => item.id !== action.payload.id);
            state.totalPrice = state.totalPrice - action.payload.price;

            const currentItemId = action.payload._id;

            const currentCount = state.ingredientsCount[currentItemId] ?? 0;

            if (currentCount > 1) {
                state.ingredientsCount[currentItemId] = currentCount - 1;
            } else {
                delete state.ingredientsCount[currentItemId];
            }
        },
        addBunToConstructor(state, action: PayloadAction<Ingredient>) {
            state.bun = (action.payload);
            state.ingredientsCount[action.payload._id] = (state.ingredientsCount[action.payload._id] || 0) + 2;
            state.totalPrice += action.payload.price * 2;
        },
        deleteBunToConstructor(state, action: PayloadAction<Ingredient>) {
            state.bun = null;
            state.totalPrice -= action.payload.price * 2;
            delete state.ingredientsCount[action.payload._id];
        },
        switchBun(state, action: PayloadAction<Ingredient>) {
            const prevBun = state.bun;
            if (prevBun) {
                delete state.ingredientsCount[prevBun._id]
                state.totalPrice -= prevBun.price * 2;
            }

            state.bun = (action.payload);
            state.ingredientsCount[action.payload._id] = 2;
            state.totalPrice += action.payload.price * 2;
        },
        moveIngredient(state, action: PayloadAction<{dragIndex: number, hoverIndex: number}>) {
            const {dragIndex, hoverIndex} = action.payload;
            // Копируем массив (Immer позволяет «мутировать», но мы работаем с draft)
            const [removed] = state.ingredients.splice(dragIndex, 1);
            state.ingredients.splice(hoverIndex, 0, removed);
        },
    }
})

export const {
    addConstructorIngredient,
    deleteConstructorIngredient,
    addBunToConstructor,
    deleteBunToConstructor,
    switchBun,
    moveIngredient,
} = burgerConstructorSlice.actions;


export const burgerConstructorReducer = burgerConstructorSlice.reducer;
