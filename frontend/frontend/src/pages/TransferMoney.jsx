import { Box, Button, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { transferMoneyApi } from '../api/accountApi';
import { useNavigate } from 'react-router-dom';
import { authUserApi } from '../api/userApi';


const TransferMoney = () => {

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
  
  const validateUser = async()=>{
    const response = await dispatch(authUserApi());
    console.log("Validate user response :",response.payload);
    if(response.payload === 401){
      navigate("/login")
    }else{
      setisLoading(false);
    }
    
  }

  const transferMoney = async (data) => {
    const requestData = { username: localStorage.getItem('username'), acc_no: data.acc_no, amount: data.amount }
    console.log("Transfer money data :", requestData);
    const response = await dispatch(transferMoneyApi(requestData));
    if(response.meta.requestStatus === 'fulfilled'){
      console.log("Transfer Complete !!!!!");
      navigate("/");
    }else{
      console.error("Transfer Failed :", response);
      alert("Transfer Failed");
    }
  }

  return (
    <div>
    {isLoading?<h2>Loading</h2>:
      <Box className="form-control">
        <form onSubmit={handleSubmit(transferMoney)}>
          <div className="flex flex-col">
            <Controller
              name='acc_no'
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  id="outlined-required"
                  label="Account Number"
                  placeholder='1234'
                  className="w-100"
                  type='number'
                  error={!!errors.acc_no}
                  helperText={errors.acc_no ? errors.acc_no.message : ''}
                />
              )}
            />
            <Controller
              name='amount'
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  id="outlined-required"
                  label="Amount"
                  placeholder='0.0'
                  className="w-100"
                  type='number'
                  error={!!errors.amount}
                  helperText={errors.amount ? errors.amount.message : ''}
                />
              )}
            />
          </div>
          <div className="flex mt-10"><Button sx={{ margin: "auto" }} type='submit'>Transfer</Button></div>
        </form>
      </Box>
      }
    </div>
  )
}

export default TransferMoney
