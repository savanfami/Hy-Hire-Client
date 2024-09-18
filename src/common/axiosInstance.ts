import axios, { AxiosResponse } from "axios";
import  {commonrequest}  from "../types/Common";

export const URL=process.env.URL



export const apiInstance = axios.create({ baseURL: URL });

export const commonRequest = async ({
  method,
  route,
  body,
  config,
}: commonrequest): Promise<AxiosResponse<any> | undefined> => {
  let requestConfig = {
    method,
    url: route,
    data: body,
    header: config,
    withCredentials: true,
  };
  try {
    const response = await apiInstance(requestConfig);
    return response;
  } catch (error) {
    console.log(error);

  }
};
