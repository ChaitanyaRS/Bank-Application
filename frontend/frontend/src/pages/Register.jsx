import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Box } from '@mui/material';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import './Register.css';
import { registersUser } from '../api/userApi';

const Register = () => {
    const { handleSubmit, control, formState: { errors } } = useForm();
    const [selectedValue, setSelectedValue] = useState('');

    const registerUser = (data) => {
        console.log(data);
        
        const { username, password, type, phone_number, email } = data;
        const registrationForm = { username, password, type, phone_number, email };
        const response = registersUser(registrationForm);
        console.log(response);
    }

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
    }

    return (
        <div>
            <Box className="form-control row-flex">
                <form onSubmit={handleSubmit(registerUser)}>
                    <div className="flex row">
                        <Controller
                            name='username'
                            control={control}
                            defaultValue=""

                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    required
                                    className="w-50"
                                    id="outlined-required"
                                    label="Username"
                                    placeholder='John'
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
                                    error={!!errors.email}
                                    helperText={errors.email ? errors.email.message : ''}
                                />
                            )}
                        />
                    </div>
                    <FormControl fullWidth variant="outlined" sx={{ mt: 2 }} >
                        <InputLabel id="demo-simple-select-label">Select Account Type</InputLabel>
                        <Select
                            
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedValue}
                            onChange={handleChange}
                            label="Select an option"
                        >
                            <MenuItem value={10}>Savings</MenuItem>
                            <MenuItem value={20}>Current</MenuItem>

                        </Select>
                    </FormControl>
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
                                    className='w-50'
                                    type='password'
                                    error={!!errors.password}
                                    helperText={errors.password ? errors.password.message : ''}
                                />
                            )}
                        />
                        <Controller
                            name='confirmPassword'
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    required
                                    id="outlined-required"
                                    label="Confirm Password"
                                    placeholder='****'
                                    className='w-50'
                                    type='password'
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
                                />
                            )}
                        />
                    </div>
                    <div className="flex mt-10"><Button sx={{ margin: "auto" }} type='submit'>Submit</Button></div>
                </form>
            </Box>
        </div>
    )
}

export default Register