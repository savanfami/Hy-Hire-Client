import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { URL } from "../../common/axiosInstance";
// import { config } from "../../common/configurations";
// import { IJobpost } from "../../types/companyTypes";
import { FormikValues } from "formik";
import { config } from "../../common/configurations";


export const postJob=createAsyncThunk<any,FormikValues>(
    'company/post-job',
    async(req,{rejectWithValue})=>{
        try{
        const {data}=await axios.post(`${URL}/job/post-job`,req,config)
        return data
        }catch(error){
            console.log(error)
            return rejectWithValue(error)
        }
    }
)

