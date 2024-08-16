import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { FormikValues } from "formik";
import { URL } from "../../common/axiosInstance";
import { loginPayload, loginResponse, verifyOtpPayload, verifyOtpResponse } from "../../types/Alltypes";
import { config } from "../../common/configurations";
export type User = {
  data?: any;
  email: string;
  password: string;
  name: string;
  role: string;
  message: string
};






export const signupUser = createAsyncThunk<User, FormikValues>(
  "user/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${URL}/auth/signup`, userData,config);
      // console.log(data,'dattatatatatattattattat')
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }
    }
  }
);


export const verifyOtp = createAsyncThunk<verifyOtpResponse, verifyOtpPayload>("verify/otp",
  async (signupData, { rejectWithValue }) => {
    try {

      const { data } = await axios.post(`${URL}/auth/verify-otp`, signupData,config)
      console.log(data, '=======reponse')
      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        // console.log(error)
        return rejectWithValue(error.response?.data)
      }

    }
  }
)


export const login = createAsyncThunk<loginResponse, loginPayload>(
  'auth/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${URL}/auth/login`, loginData,config);
      console.log(data,'from login')
      return data;
    } catch (error) {
      // console.log(error)
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
);


export const getUserData=createAsyncThunk('user/getData',async(_,{rejectWithValue})=>{
  try{
   const {data}=await axios.get(`${URL}/auth/`,config)
   console.log(data,'data fetched successfully')
   return data
  }catch(error){
    if(error instanceof AxiosError){
      return rejectWithValue(error.response?.data)
    }
    return rejectWithValue({message:'unknown error occured'})

  }
})


export const logOut=createAsyncThunk('auth/logout',async(_,{rejectWithValue})=>{
  try{
 const {data}=await axios.get(`${URL}/auth/logout`,config)
 try {
  localStorage.removeItem('persist:root');
  // console.log('Item removed successfully');
  return data
} catch (error) {
  console.error('Error removing item:', error);
}
 return data

  }catch(error){
    if(error instanceof AxiosError){
      return rejectWithValue(error.response?.data)
    }
    return rejectWithValue({message:'unknown error occured'})
  }
})