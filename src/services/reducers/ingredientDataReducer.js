import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const URL = "https://raw.githubusercontent.com/MCMXCIXX/burger-ingredients-db/refs/heads/main/ingredients.json";

export const fetchIngredientsData = createAsyncThunk(
    "ingredientsData/fetchIngredientsData",
    async (agr, thunkAPI) => {
        try {
            const response = await fetch(URL);
            if (!response.ok) {
                return thunkAPI.rejectWithValue('Ошибка сервера');
            }
            return await response.json();
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
            return thunkAPI.rejectWithValue(message);
        }
    }
)

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