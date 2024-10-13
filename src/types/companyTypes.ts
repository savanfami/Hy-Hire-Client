import { IApplicantDetails } from "./jobTypes";


export type JobReducer = {
    loading: boolean,
    err: null | any,
    jobs:any
    applicantDetails:IApplicantDetails[]
}

export interface ICompanySearchParams{
    companyName:string;
    location:string;
    page:number;
    industry:string
}

export interface IApplicantProfileProps {
    userId: string; 
}

export interface IUpdateApplicationStatusPayload{
    applicationId: string;
    hiringStatus: string;
    interviewDate?: Date | null 
    interviewTime?: string 
}
export interface IUpdateApplicationStatusResponse{
    _id: string;
    hiringStatus: string;
}


