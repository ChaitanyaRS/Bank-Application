import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../constants";

export const addMoneyApi = createAsyncThunk(
    'account/addMoney',
    async (data, { rejectWithValue }) => {
        try {
            console.log("Data in api page :", data);

            const response = await axios.post(`${URL}add-money`, data, {
                withCredentials: true
            })
            console.log("Reponse from add money API: ", response);
            return { data: response.data, status: response.status };
        } catch (exception) {
            console.error(exception);
            return rejectWithValue(exception.response?.data || "Error while addMoneyAPI");
        }
    }
)

export const transferMoneyApi = createAsyncThunk(
    'account/transferMoney',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${URL}transfer-money`, data, {
                withCredentials: true
            })
            console.log("transferMoney response :", response);
            return { data: response.data }
        } catch (exception) {
            console.log(exception);
            return rejectWithValue(exception.response?.data || "Error while Transfering money")
        }
    }
)

