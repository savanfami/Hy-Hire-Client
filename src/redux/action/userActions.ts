import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { FormikValues } from "formik";
import { URL } from "../../common/axiosInstance";
import { GoogleCredential, GoogleSignupResponse, loginPayload, loginResponse, verifyOtpPayload, verifyOtpResponse } from "../../types/Alltypes";
import { config } from "../../common/configurations";
import {removeExperience,removeEducations,removeResumes, removeCertificates} from '../reducers/userSlice'
import { RootState } from "../store";
import { ICompanySearchParams } from "../../types/companyTypes";
import { IPaginatedCompaniesResponse } from "../../types/userTypes";
import { handleAxiosError } from "../../utils/customError";
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
      const { data } = await axios.post(`${URL}/auth/signup`, userData, config);
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
      const { data } = await axios.post(`${URL}/auth/verify-otp`, signupData, config)
      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data)
      }

    }
  }
)


export const login = createAsyncThunk<loginResponse, loginPayload>(
  'auth/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${URL}/auth/login`, loginData, config);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
);





export const logOut = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${URL}/auth/logout`, config)
    try {
      localStorage.removeItem('persist:root');
      return data
    } catch (error) {
      console.error('Error removing item:', error);
    }
    return data

  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data)
    }
    return rejectWithValue({ message: 'unknown error occured' })
  }
})


export const googleSignup = createAsyncThunk<GoogleSignupResponse, GoogleCredential>('auth/googlesingup', async (userCredentials, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${URL}/auth/googleauth`, userCredentials, config);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data);
    }
    return rejectWithValue({ message: 'An unknown error occurred' });
  }
}
)

export const updateProfile = createAsyncThunk<any, any>(
  'update/profile',
  async (profileData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${URL}/user/profile`, profileData, config);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
);


export const getUserData = createAsyncThunk(
  'user/get-data',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/user/get-data`, config)
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)


export const removeExperienceandUpdateProfile=createAsyncThunk(
  'user/remove-experience',
  async(index:number,{dispatch,getState})=>{
    try {  
      dispatch (removeExperience(index))
      const updatedUserState=getState() as RootState
      await dispatch(updateProfile(updatedUserState?.user?.user?.data))
    } catch (error) {
      console.log(error)
      
  }
}
)


export const removeResumeandUpdateProfile=createAsyncThunk(
  'user/remove-resume',
  async(index:number,{dispatch,getState})=>{
    try {  
      dispatch (removeResumes(index))
      const updatedUserState=getState() as RootState
      await dispatch(updateProfile(updatedUserState?.user?.user?.data))
    } catch (error) {
      console.log(error)
      
  }
}
)

export const removeEducationandUpdateProfile=createAsyncThunk(
  'user/remove-education',
  async(index:number,{dispatch,getState})=>{
    try {  
      dispatch (removeEducations(index))
      const updatedUserState=getState() as RootState
      await dispatch(updateProfile(updatedUserState?.user?.user?.data))
    } catch (error) {
      console.log(error)
      
  }
}
)

export const removeCertificateandUpdateProfile=createAsyncThunk(
  'user/remove-certificate',
  async(index:number,{dispatch,getState})=>{
    try {  
      dispatch (removeCertificates(index))
      const updatedUserState=getState() as RootState
      await dispatch(updateProfile(updatedUserState?.user?.user?.data))
    } catch (error) {
      console.log(error)
      
  }
}
)


export const getAllCompany=createAsyncThunk<IPaginatedCompaniesResponse,any>(
  'get/allcompany',
  async(payload:ICompanySearchParams,{rejectWithValue})=>{
    try {
      const { data } = await axios.get(`${URL}/company/get-allcompany`,{
          params:{
            page:payload.page,
            location:payload.location,
            name:payload.companyName,
            industry:payload.industry
          },
      });
      return data?.data;
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)


export const fetchSavedJobs=createAsyncThunk<any>(
  'get/saved-jobs',
  async(_,{rejectWithValue})=>{
    try {
      const { data } = await axios.get(`${URL}/job/savedjobs`,config);
       return {data}
    } catch (error) {
      return rejectWithValue(handleAxiosError(error))
    }
  }
)


