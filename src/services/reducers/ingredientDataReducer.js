import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {request} from "../api";

export const fetchIngredientsData = createAsyncThunk(
    'ingredients/fetchIngredients',
    async (_, { rejectWithValue }) => {
        try {
            const data = await request('/ingredients');
            return data.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const initialState = {
    ingredients: [],
    loading: false,
    error: null,
}

const ingredientDataSlice = createSlice({
    name: "ingredientsData",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredientsData.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchIngredientsData.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.ingredients = action.payload;
            })
            .addCase(fetchIngredientsData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Неизвестная ошибка';
            })
    }
})

export const ingredientDataReducer = ingredientDataSlice.reducer;
