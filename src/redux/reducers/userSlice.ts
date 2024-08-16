import { createSlice } from "@reduxjs/toolkit";
import { errorPayload, userReducer } from "../../types/Alltypes";
import { getUserData, login, logOut, signupUser, verifyOtp } from "../action/userActions";


const initialState: userReducer = {
    loading: false,
    user: null,
    err: false,
    role: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetState: (state) => {
            state.loading = false;
            state.err = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                (state.loading = true),
                    (state.err = false),
                    state.role=null,
                    (state.user = null);
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false,
                    state.err = false,
                    state.role=action.payload.role,
                    state.user = action.payload.data
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.err = (action.payload as errorPayload).message;
                } else {
                    state.err = action.error.message || "unknown error occured";
                }
                state.role=null,
                state.user = null;
            })
            .addCase(verifyOtp.pending, (state) => {
                (state.loading = true), (state.err = false), (state.role = null);
            })
            .addCase(verifyOtp.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload;
                state.err = false;
                state.role = payload?.data.role as "user" | "company" | "admin";
            })
            .addCase(verifyOtp.rejected, (state, { payload }) => {
                (state.loading = false),
                    (state.err = (payload as errorPayload).message || "error occured"),
                    (state.role = null);
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload;
                state.err = false;
                state.role = payload?.data.role as 'user' | 'company' | 'admin'
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.role=null
                if (action.payload) {
                    state.err = (action.payload as errorPayload).message
                } else {
                    state.err = action.error.message || "An unknown error occured";
                }
            })
            .addCase(getUserData.fulfilled, (state, { payload }) => {
                state.user = payload
                state.err = false
            })
            .addCase(getUserData.rejected, (state, action) => {
                if (action.payload) {
                    state.err = (action.payload as errorPayload).message
                } else {
                    state.err = action.error.message || "unknown error occured"
                }
            })
            .addCase(logOut.pending,(state)=>{
                  state.loading=true
                  state.role=null
            })
            .addCase(logOut.fulfilled,(state)=>{
                state.loading=false,
                state.user=null,
                state.role=null,
                state.err=false
            })
            .addCase(logOut.rejected,(state,action)=>{
                if (action.payload) {
                    state.err = (action.payload as errorPayload).message
                    state.loading=false
                } else {
                    state.err = action.error.message || "unknown error occured"
                    state.loading=false
                }
            })


    },
});

export const { } = userSlice.actions;

export default userSlice.reducer;
