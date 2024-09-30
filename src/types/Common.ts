import { AxiosRequestConfig } from "axios";

export type commonrequest = {
    method: HTTPMethod;
    route: string;
    body?: any;
    config: AxiosRequestConfig;
  };


  export type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";


  export interface IPaginationProps{
    page:number;
    totalPages:number;
    onPageChange:(newPage:number)=>void
    className?:string
    
}


export type Industry = {
  sector: string;
  subIndustries: string[];
};


export interface Suggestion {
  properties: {
    formatted: string;
  };
}

export interface PlacesAutocompleteProps {
  onSelect: (location: string) => void;
  initialValue?: string;
  componentType?:string
}