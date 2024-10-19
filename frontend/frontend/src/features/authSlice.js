import { createSlice } from "@reduxjs/toolkit"
import { loginApi, logoutUser } from "../api/userApi";


const initialState = {
    isAuthenticated: false,
    user: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    //This will be used if you dont need to do anything in backend.
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginApi.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginApi.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.user = action.payload; // Store user data if returned from API
            })
            .addCase(loginApi.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(logoutUser.pending,(state) =>{
                state.status = 'loading'
            })
            .addCase(logoutUser.fulfilled,(state) =>{
                state.status ="succeeded",
                state.isAuthenticated= false,
                state.user = null;
            })
            .addCase(logoutUser.rejected,(state,action)=>{
                state.status = "failed",
                state.error = action.error.message;
            });
    },
});

export const { logout } = authSlice.actions

export default authSlice.reducer