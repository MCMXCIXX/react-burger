import {createSlice} from "@reduxjs/toolkit";
import {getUser} from "../thunks/authThunks";

const initialState = {
    user: null,
    isAuthenticated: false,
    passwordResetRequested: false,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state, action) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setPasswordResetRequested: (state, action) => {
            state.passwordResetRequested = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(getUser.rejected, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            });
    }
})


export const {setUser, logout, setLoading, setError,setPasswordResetRequested} = authSlice.actions;
export default authSlice.reducer;
