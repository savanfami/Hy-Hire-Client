import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { URL } from "../../common/axiosInstance";

export const getAllData = createAsyncThunk<any>(
    "user/getalldata",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`${URL}/job/getallData`);
        return data;
      } catch (error) {
        if (error instanceof AxiosError) {
          return rejectWithValue(error.response?.data)
        }
      }
    }
  );