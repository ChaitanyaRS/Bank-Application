import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import './Register'

const Login = () => {
  const { handleSubmit, control, formState: { errors } } = useForm();

  const loginUser = (data) => {
    console.log(data);
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
