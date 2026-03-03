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
            return thunkAPI.rejectWithValue(error.message);
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
            })
            .addCase(fetchIngredientsData.fulfilled, (state, action) => {
                state.loading = false;
                state.ingredients = action.payload;
            })
            .addCase(fetchIngredientsData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const ingredientDataReducer = ingredientDataSlice.reducer;