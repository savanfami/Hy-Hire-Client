import { createSlice, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { applyJob, getAllJob, listUsersByJobId, postJob } from "../action/jobAction";
import { JobReducer } from "../../types/companyTypes";
import { getAllData } from "../action/commonAction";
import { errorPayload } from "../../types/Alltypes";
import { updateApplicationStatus } from "../action/companyAction";


const initialState: JobReducer = {
    loading: false,
    err: null,
    jobs: [],
    applicantDetails:[]
}


const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        reset(state) {
            state.jobs = []
            
        },
    },

    extraReducers: (builder: ActionReducerMapBuilder<JobReducer>) => {
        builder
            .addCase(postJob.pending, (state) => {
                state.loading = true
                state.err = null
            })
            .addCase(postJob.fulfilled, (state) => {
                state.loading = false;
                state.err = null;
                // state.jobs=[...state.jobs,payload];
            })
            .addCase(postJob.rejected, (state, { payload }) => {
                state.loading = false
                state.err = payload
            })
            .addCase(getAllJob.pending, (state) => {
                state.loading = true;
                state.err = null
            })
            .addCase(getAllJob.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.err = null;
                state.jobs = payload
            })
            .addCase(getAllJob.rejected, (state, { payload }) => {
                state.loading = false;
                state.err = payload
            })
            .addCase(applyJob.pending,(state)=>{
                state.loading=true;
                state.err=null;
            })
            .addCase(applyJob.fulfilled,(state)=>{
                state.loading=false
                state.err=null;
            })
            .addCase(applyJob.rejected,(state,{payload})=>{
                state.loading=false;
                state.err=payload as string
            })
            .addCase(getAllData.pending,(state)=>{
                state.loading=true;
                state.err=false;
            })
            .addCase(getAllData.fulfilled,(state,{payload})=>{
                state.loading=false;
                state.jobs=payload;
                state.err=false
            })
            .addCase(getAllData.rejected,(state,{payload})=>{
                state.loading=false;
                state.jobs=payload as any ;
            })
            .addCase(listUsersByJobId.pending,(state)=>{
                state.loading=true;
                state.err=false;
            })
            .addCase(listUsersByJobId.fulfilled,(state,{payload})=>{
                state.loading=false;
                state.err=false;
                state.applicantDetails=payload
            })
            .addCase(listUsersByJobId.rejected,(state,{payload})=>{
                state.loading=false;
                state.err= (payload as errorPayload).message
            })
            .addCase(updateApplicationStatus.pending,(state)=>{
                state.loading=true;
                state.err=false
            })
            .addCase(updateApplicationStatus.fulfilled,(state,{payload})=>{
                state.loading=false;
                state.err=false;
               const applicantdata= state.applicantDetails.find((data)=>data._id===payload._id)
               if(applicantdata){
                   applicantdata.hiringStatus=payload.hiringStatus
               }
            })
            .addCase(updateApplicationStatus.rejected,(state,{payload})=>{
                state.loading=false;
                state.err=(payload as errorPayload).message
            })
    }

})


export const { reset } = jobSlice.actions
export default jobSlice.reducer