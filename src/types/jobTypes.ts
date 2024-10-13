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
    datePostedd?: any;
    jobname?:string;
    location?:string;
}


export interface Job {
    _id: string;
    jobTitle: string;
    employmentType: string;
    jobDescription: string;
    jobLocation: string;
    salaryMin: number;
    salaryMax: number;
    endDate: string; 
    experience: string;
    responsibilityInput: string[];
    skillInput: string[];
    qualificationInput: string[];
    createdAt: string;
    companyDetails: CompanyDetails;
  }
  
 export interface CompanyDetails {
    _id: string;
    description: string;
    email: string;
    foundedDate: string;
    icon: string;
    location: string;
    name: string;
    sector: string;
    socialLinks: SocialLinks;
    subIndustry: string;
    website: string;
  }
  
 export interface SocialLinks {
    instagram: string;
    facebook?: string;
    twitter: string;
    linkedIn: string;
  }
  

  export interface IUserDetails {
    _id: string;
    email: string;
    name:string;
    aboutMe: string;
    education: IEducation[];  
    experiences: IExperience[]; 
    image: string;
    location: string;
    phone: string;
    skills: string[];
    socialLinks:SocialLink
  }


  interface IExperience {
    working?: boolean;
    title: string;
    description: string;
    company: string;
    year: {
      from: string; 
      to?: string; 
    };
  }

  interface IEducation {
    university: string;
    course: string;
    year: {
      from: string; 
      to: string;
    };
    description?: string; 
  }
  
export interface IApplicantDetails {
    _id: string;
    hiringStatus: string;
    resume: string;
    createdAt: Date;
    userDetails: IUserDetails;
  }

  export interface SocialLink {
    Instagram: string;
    twitter: string;
    LinkedIn: string;
  }
  