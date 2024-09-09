import { createSlice, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { postJob } from "../action/jobAction";
import { JobReducer } from "../../types/companyTypes";


const initialState:JobReducer={
    loading:false,
    err:null,
    jobs:[],
    // applicants:[],
    // applications:[]
}


const jobSlice=createSlice({
    name:'job',
    initialState,
    reducers:{
        reset(state){
            state.jobs=[]
        }
    },
    extraReducers:(builder:ActionReducerMapBuilder<JobReducer>)=>{
       builder
       .addCase(postJob.pending,(state)=>{
        state.loading=true
        state.err=null
       })
       .addCase(postJob.fulfilled,(state)=>{
        state.loading=false;
        state.err=null;
        // state.jobs=[...state.jobs,payload];
       })
       .addCase(postJob.rejected,(state,{payload})=>{
        state.loading=false
        state.err=payload
       })
    }
    
})


export const {reset}=jobSlice.actions
export default jobSlice.reducer