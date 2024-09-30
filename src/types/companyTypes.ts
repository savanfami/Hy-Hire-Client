

export type JobReducer = {
    loading: boolean,
    err: null | any,
    jobs:any
    // // jobs: getAllJobsEntity | any
    // job: getAllJobsEntity | null,
    // applicant: JobApplication | null
    // applicants: JobApplication[]
    // applications: JobApplication[]
}

export interface ICompanySearchParams{
    companyName:string;
    location:string;
    page:number;
    industry:string
}