import { AxiosRequestConfig } from "axios";

export type commonrequest = {
    method: HTTPMethod;
    route: string;
    body?: any;
    config: AxiosRequestConfig;
  };


  export type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
