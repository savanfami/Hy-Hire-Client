import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { URL } from "../../common/axiosInstance";
import { requestType } from "../../types/Admin";


export const listRequest = createAsyncThunk(
    'admin/list-request',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${URL}/company/list-request`)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


export const updateRequest = createAsyncThunk<requestType, requestType>(
    'admin/update-request',
    async (req, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${URL}/company/update-request`, req)
            console.log(response.data)
           return await response.data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)