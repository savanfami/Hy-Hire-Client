export interface JobListParams {
    page: number;
    limit: number;
    search: string;
}

export interface jobs {
    jobTitle: string;
    jobDescription: string;
    location: string;
    salaryMax: string;
    salaryMin: string;
    companyId?: string;
    endDate: string;
    experience: string;
    qualificationInput: string[];
    skillInput: string[];
    responsibilityInput: string[];
    employmentType: string;
    createdAt?: string;
    updatedAt?: string;
    status?: boolean;
    _id?: string;
}



export interface IApplyJobPayload {
    jobId: string;
    resume: string,
    companyId: string;
}


export interface IJobFilterParams {
    page: number;
    salaryUpto?: string;
    jobType?: string[];
    datePostedd?: string | null;
}