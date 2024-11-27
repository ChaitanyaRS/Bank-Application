import { Box, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import "./Register.css"
import { addMoneyApi } from '../api/accountApi'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authUserApi } from '../api/userApi'

const AddMoney = () => {

    const { handleSubmit, control, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        // console.log("Response in transfer money page :",response);
        // setisLoading(true);
        validateUser();
        // setisLoading(false);
        // console.log(decodeURIComponent(document.cookie));

    });

    const validateUser = async () => {
        const response = await dispatch(authUserApi());
        // console.log("Validate user response :", response.payload);
        if (response.payload === 401) {
            navigate("/login")
        } else {
            setisLoading(false);
        }

    }
    const addMoney = async (data) => {
        const requestData = { username: localStorage.getItem('username'), amount: data.amount }
        console.log("Add Money Data :", requestData);
        const response = await dispatch(addMoneyApi(requestData));
        console.log("Response in addMoney Page :", response);

        if (response.meta.requestStatus === "fulfilled") {
            console.log(response.payload?.data);
            navigate("/");
        } else {
            console.error("Error while adding money");

        }
    }

    return (
        <div className='flex-col align-center'>
            <div className="h3">Add Money</div>
            {isLoading ? <h2>Loading...</h2> :
                <Box className="form-control">
                    <form onSubmit={handleSubmit(addMoney)} className='flex-col form-control'>
                        <div className="m-auto">
                            <Controller
                                name='amount'
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        required
                                        className=""
                                        id="outlined-required"
                                        label="Amount"
                                        placeholder='John'
                                        type='number'
                                        // className='w-100'
                                        error={!!errors.phone_number}
                                        helperText={errors.phone_number ? errors.phone_number.message : ''}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex mt-10"><Button sx={{ margin: "auto" }} type='submit'>Add Balance</Button></div>
                    </form>
                </Box>}
        </div>
    )
}

export default AddMoney
