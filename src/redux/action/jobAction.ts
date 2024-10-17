import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { URL } from "../../common/axiosInstance";
// import { config } from "../../common/configurations";
// import { IJobpost } from "../../types/companyTypes";
import { FormikValues } from "formik";
import { config } from "../../common/configurations";
import {IApplicantDetails, IApplyJobPayload, IJobFilterParams} from '../../types/jobTypes'
import { handleAxiosError } from "../../utils/customError";

export const postJob = createAsyncThunk<any, FormikValues>(
    'company/post-job',
    async (req, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${URL}/job/post-job`, req, config)
            console.log(data)
            return data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
    }
)


// export const getAllJob = createAsyncThunk(
//     'company/list-job',
//     async (_, { rejectWithValue }) => {
//         try {
//             console.log('response')
//             const {data} = await axios.get(`${URL}/job/get-alljobs`)
//             return data
//         } catch (error) {
//             console.log(error)
//             rejectWithValue(error)
//         }
//     }
// )


export const getAllJob = createAsyncThunk(
    'jobs/getAllJob',
    async (payload: IJobFilterParams, { rejectWithValue }) => {
      try {
        const {data} = await axios.get(`${URL}/job/get-alljobs`, {
          params: {
            page:payload.page,
            salaryUpto: payload.salaryUpto,
            jobTypes: payload.jobType,
            datePosted: payload.datePostedd,
            jobname: payload.jobname,
            location:payload.location
          },
        });
        return data; 
      } catch (error: any) {
        return rejectWithValue(error); 
      }
    }
  );


export const applyJob=createAsyncThunk<any,IApplyJobPayload>(
    'user/apply-job',
    async(payload,{rejectWithValue})=>{
        try {
            const {data}=await axios.post(`${URL}/job/apply-job`,payload,config)
            console.log(data)
            return data
        } catch (error:any) {
            if(error.response){
              return rejectWithValue(error?.response?.data?.message)
            }
        }
    }
)


export const listUsersByJobId = createAsyncThunk<IApplicantDetails[],string>(
  'company/list-users',
  async (jobId:string, { rejectWithValue }) => {
      try {
          const { data } = await axios.get(`${URL}/job/${jobId}/listusers`,config)
          return data
      } catch (error) {
          return rejectWithValue(handleAxiosError(error))
      }
  }
)