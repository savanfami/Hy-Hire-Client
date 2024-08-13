import axios, { AxiosResponse } from "axios";
import { AxiosRequestConfig } from "axios";

export const URL="http://localhost:4000/api"

type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type commonRequest = {
  method: HTTPMethod;
  route: string;
  body?: any;
  config: AxiosRequestConfig;
};

export const apiInstance = axios.create({ baseURL: URL });

export const commonRequest = async ({
  method,
  route,
  body,
  config,
}: commonRequest): Promise<AxiosResponse<any> | undefined> => {
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
