import { createSlice, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { adminReducer } from "../../types/Admin";
import { listRequest, updateRequest } from "../action/adminAction";



const initialState: adminReducer = {
    loading: false,
    request: [],
    err: null,
    role: null,
}


const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {

    },
    extraReducers: (builder: ActionReducerMapBuilder<adminReducer>) => {
        builder
            .addCase(listRequest.pending, (state) => {
                state.loading = true;
                state.err = false
            })
            .addCase(listRequest.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.request = payload;
                state.err = false;
            })
            .addCase(listRequest.rejected, (state) => {
                state.loading = false
                state.err = false
            })
            .addCase(updateRequest.pending, (state) => {
                state.loading = true;
                state.err = null;
            })
            .addCase(updateRequest.fulfilled, (state,{payload}) => {
                state.request = state.request.map(item =>
                   item.companyId.email === payload.email
            ? { ...item, companyId: { ...item.companyId, approvalStatus: payload.status } }
            : item
        );
                state.loading = false;
                state.err = null;
            })
            .addCase(updateRequest.rejected, (state, { payload }) => {
                state
                state.loading = false;
                state.err = payload
            })
    }
})


export default adminSlice.reducer;