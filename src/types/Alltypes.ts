import { AxiosRequestConfig } from "axios";
import { FormikValues } from "formik";

export interface formValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type userReducer = {
  loading: boolean;
  err: boolean | string
  role: "user" | "admin" | "company" | null | string
  user: null | any;
};



export type erroPayload = {
  message: string;
};


export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type commonRequest = {
  method: HTTPMethod;
  route: string;
  body?: any;
  config: AxiosRequestConfig

}

export type errorPayload = {
  message: string
}

export type verifyOtpPayload = {
  otp: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'company' | 'admin'
}

export type verifyOtpResponse = {
  name(arg0: string, name: any): unknown;
  role: 'user' | 'company' | 'admin'
  success: boolean;
  message: string
  data: UserDetails
}

export type UserDetails = {
  name: string;
  email: string;
  role: 'user' | 'company' | 'admin'
}

export type verifyOtpError = {
  message: string
}


export type loginResponse = {
  data: UserDetails;
  role: 'user' | 'company' | 'admin'

}


export interface loginPayload extends FormikValues {
  email: string;
  password: string
}