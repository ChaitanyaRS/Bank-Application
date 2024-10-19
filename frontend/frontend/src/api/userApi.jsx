import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "../constants";
import axios from "axios";
import { useSelector } from "react-redux";



export const registersUser = async (userData) => {
    const response = await axios.post(`${URL}register`, userData);
    console.log(response.data);
    return response.data;
}

export const loginApi = createAsyncThunk(
    'auth/loginUser',
    async (data) => {
        try {
            console.log(data);
            const response = await axios.post(`${URL}login`, data, {
                withCredentials: true, // Include cookies
            });
            return response.data;
        } catch (exception) {
            console.error(exception.status)
            return rejectWithValue(exception.response?.data || 'An error occurred');
        }
    }
)

export const getUserData = createAsyncThunk(
    'auth/userData',
    async (data) => {
        try {
            const username = useSelector(state => state.auth.payload);
            console.log("username ", username);
            const response = await axios.get(`${URL}user-details`, {
                withCredentials: true,
            })

        } catch (exception) {
            return rejectWithValue(exception.response?.data || "An error occured")
        }
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async () => {
        try {
            const response = await axios.post(`${URL}logout`, {
                withCredentials: true
            })
            console.log(response);
            return response;
        } catch (exception) {
            return rejectWithValue(exception.response?.data || "Error while logout");
        }
    }
)