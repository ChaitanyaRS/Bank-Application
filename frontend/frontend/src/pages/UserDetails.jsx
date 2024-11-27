import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../api/userApi';
import './Register.css';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Box } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const UserDetails = () => {
    const dispatch = useDispatch();
    const username = localStorage.getItem('username');
    const { handleSubmit, control, setValue, formState: { errors } } = useForm();
    const [userData, setuserData] = useState({ acc: {}, email: "", password: "", phone_number: "", username: "" });
    const navigate = useNavigate();
    // const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        if (username) {
            fetchUserData();
            console.log("Userdata", userData);
        }
    }, []);

    useEffect(() => {
        if (userData) {
            setValue("username", userData.username);
            setValue("phone_number", userData.phone_number);
            setValue("email", userData.email);
            setValue("type", userData.acc.type);
            setValue("balance", userData.acc.balance);
        }
    }, [userData])


    const fetchUserData = async () => {
        const response = await dispatch(getUserData(username));
        console.log("fetch user data response method: ", response);

        if (response.meta.requestStatus === "fulfilled") {
            console.log("userDetails page data response 1:", response.payload.data);
            const data = response.payload.data;
            // console.log("userDetails page data response :" + data);
            setuserData({ ...data });
        } else if (response.meta.requestStatus === "rejected") {
            Cookies.remove("token");
            localStorage.removeItem("username");
            //navigate("/login");
        }
    }
    const saveData = (data) => {
    }

    return (
        <>
            {username ?
                <div>
                    <Box className="form-control row-flex">
                        <form onSubmit={handleSubmit(saveData)}>
                            <div className="flex row">
                                <Controller
                                    name='username'
                                    control={control}
                                    defaultValue={userData.username}

                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            required
                                            className="w-50"
                                            id="outlined-required"
                                            label="Username"
                                            placeholder='John'
                                            // value={userData.username}
                                            // className='w-100'
                                            error={!!errors.username}
                                            helperText={errors.username ? errors.username.message : ''}
                                        />
                                    )}
                                />
                                <Controller
                                    name='phone_number'
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            required
                                            className="w-50"
                                            id="outlined-required"
                                            label="Phone Number"
                                            placeholder='John'
                                            type='number'
                                            // className='w-100'
                                            error={!!errors.phone_number}
                                            helperText={errors.phone_number ? errors.phone_number.message : ''}
                                        />
                                    )}
                                />
                            </div>
                            <div className="mt-10">
                                <Controller
                                    name='email'
                                    control={control}

                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            required
                                            id="outlined-required"
                                            label="Email"
                                            placeholder='Test@123'
                                            className='w-100 mt-10'
                                            disabled
                                            error={!!errors.email}
                                            helperText={errors.email ? errors.email.message : ''}
                                        />
                                    )}
                                />
                            </div>
                            <div className="mt-10">
                                <Controller
                                    name='type'
                                    control={control}

                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            required
                                            id="outlined-required"
                                            label="Accout Type"
                                            className='w-100 mt-10'
                                            disabled
                                            error={!!errors.type}
                                            helperText={errors.type ? errors.type.message : ''}
                                        />
                                    )}
                                />
                            </div>
                            <div className="mt-10">
                                <Controller
                                    name='balance'
                                    control={control}

                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            required
                                            id="outlined-required"
                                            label="Accout Balance"
                                            className='w-100 mt-10'
                                            disabled
                                            error={!!errors.type}
                                            helperText={errors.type ? errors.type.message : ''}
                                        />
                                    )}
                                />
                            </div>
                            <div className="row flex">
                                <Controller
                                    name='password'
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            required
                                            id="outlined-required"
                                            label="Password"
                                            placeholder='****'
                                            className='w-100'
                                            type='text'
                                            error={!!errors.password}
                                            helperText={errors.password ? errors.password.message : ''}
                                        />
                                    )}
                                />

                            </div>
                            <div className="flex mt-10"><Button sx={{ margin: "auto" }} type='submit'>Save</Button></div>
                        </form>
                    </Box>
                </div>
                : <div>User not logged in</div>}
        </>
    )
}

export default UserDetails
