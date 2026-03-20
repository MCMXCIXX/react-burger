import {createAsyncThunk} from "@reduxjs/toolkit";
import {setError, setLoading, setPasswordResetRequested, setUser} from "../reducers/authSlice";
import {request} from "../api";


export const registerUser = createAsyncThunk(
    'auth/register',
    async ({email, password, name}, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setLoading(true));
            const data = await request('/auth/register', {
                method: 'POST',
                body: JSON.stringify({email, password, name}),
            });
            console.log(data);
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            dispatch(setUser(data.user));
            return data.user;

        } catch (err) {
            dispatch(setError(err.message));
            return rejectWithValue(err.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
)

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (email, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setLoading(true));
            await request('/password-reset', {
                method: 'POST',
                body: JSON.stringify({email})
            })
            dispatch(setPasswordResetRequested(true));
        } catch (error) {
            dispatch(setError(error.message));
            return rejectWithValue(error.message)
        } finally {
            dispatch(setLoading(false));
        }
    }
)

export const setNewPassword = createAsyncThunk(
    'auth/setNewPassword',
    async ({password, code}, {dispatch, rejectWithValue}) => {
        try{
            dispatch(setLoading(true));
            const data = await request('/password-reset/reset', {
                method: 'POST',
                body: JSON.stringify({password, token: code}),
            })
            console.log(data);
        } catch (error) {
            dispatch(setError(error.message));
            return rejectWithValue(error.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({email, password}, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setLoading(true));
            const data = await request('/auth/login', {
                method: 'POST',
                body: JSON.stringify({email, password}),
            });
            console.log(data);
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            dispatch(setUser(data.user));
            return data.user;

        } catch (err) {
            dispatch(setError(err.message));
            return rejectWithValue(err.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
)


export const getUser = createAsyncThunk(
    'auth/getUser',
    async (_, {rejectWithValue}) => {
        try {
            const data = await request('/auth/user');
            return data.user;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, {rejectWithValue}) => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                throw new Error('Refresh Token is missing');
            }
            const data = await request('/auth/refreshToken', {
                method: 'POST',
                body: JSON.stringify({token: refreshToken}),
            })
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            return data;

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)
