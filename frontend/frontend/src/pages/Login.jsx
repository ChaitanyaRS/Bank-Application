import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import './Register.css'
import { loginApi } from '../api/userApi'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = async (data) => {
    const response = await dispatch(loginApi(data));

    if (response.meta.requestStatus === "fulfilled") {
      // console.log(response);
      
      navigate("/user-details")
    } else {
      console.error(response.message, "User was not logged in.");
    }
  }

  return (
    <div>
      <Box className="form-control">
        <form onSubmit={handleSubmit(loginUser)}>
          <div className="flex flex-col">
            <Controller
              name='username'
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  id="outlined-required"
                  label="Username"
                  placeholder='John'
                  className="w-100"
                  error={!!errors.username}
                  helperText={errors.username ? errors.username.message : ''}
                />
              )}
            />
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
                  className="w-100"
                  type='password'
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                />
              )}
            />
          </div>
          <div className="flex mt-10"><Button sx={{ margin: "auto" }} type='submit'>Login</Button></div>
        </form>
      </Box>
    </div>
  )
}

export default Login
