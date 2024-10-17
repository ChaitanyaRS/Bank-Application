import { URL } from "../constants";
import axios from "axios";

export const registersUser = async (userData) =>{
    console.log(userData);
    
    const response  = await axios.post(`${URL}/register`,userData);
    console.log(response.data);
    
    return response.data;
}