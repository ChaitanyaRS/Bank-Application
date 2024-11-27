import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "../constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";



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
    async (username, {rejectWithValue}) => {
        try {
            //const username = useSelector(state => state.auth.payload);
            console.log("userData username param :", username);
            const response = await axios.get(`${URL}user-details`, {
                params:{username },
                withCredentials: true,
            })
            // console.log("userData response :", response);
            const { headers,config,request, ...serializableData } = response;
            console.log("Response Data :",response);
            console.log("Serializable data :",serializableData);
            
            return serializableData;
        } catch (exception) {
            console.error(exception);
            return rejectWithValue(exception.response?.data || "An error occured");
        }
    }
)

export const updateUserData = createAsyncThunk(
    'auth/updateData',
    async (data, {rejectWithValue}) => {
        try {
            const response = await axios.put(`${URL}edit-user`,data, {
                withCredentials: true,
            })
            // const { headers,config,request, ...serializableData } = response;
            console.log("Response Data :",response);
            // console.log("Serializable data :",serializableData);
            return 'done';
            // return serializableData;
        } catch (exception) {
            return rejectWithValue(exception.response?.data || "An error occured")
        }
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${URL}logout-user`, null,{
                withCredentials: true
            })
            // console.log("Reponse: " + response);
            return response.status;
        } catch (exception) {
            console.error("Exception in logout user method :",exception);
            return rejectWithValue(exception.response?.data || "Error while logout");
        }
    }
)

export const authUserApi = createAsyncThunk(
    'auth/verifyUser',
    async (_,{rejectWithValue})=>{
        try {
            const response = await axios.get(`${URL}auth`,{
                withCredentials:true
            })
            // console.log("auth API response ",response);
            
            return response.status;
        } catch (exception) {
            // console.error("Exception :",exception);
            return rejectWithValue(exception.response?.status || "Error while Authentication");
        }
    }
)

// export const authenticationUser = async()=>{
//     const dispatch = useDispatch();
//     const response = await dispatch(authUserApi);
//     console.log("auth user method response :",response);
//     return response;
    
// }