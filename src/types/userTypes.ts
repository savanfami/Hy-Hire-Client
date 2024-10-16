export interface User {
    email: string;
}

export interface AdditionalDetails {
    phone: number;
    Instagram?: string;
    LinkedIn?: string;
    Twitter?: string;
}

export interface Props {
    user: User;
    onSubmit: (values: AdditionalDetails) => void;
}


interface SocialLinks {
    instagram: string;
    facebook: string;
    twitter: string;
    linkedIn: string;
  }
  
  export interface ICompanyData {
    _id?: string;
    name: string;
    email: string;
    isBlocked: boolean;
    role: 'company';
    profileCompleted: boolean;
    approvalStatus: 'Approved' | 'Pending' | 'Rejected';
    createdAt: string;
    updatedAt: string;
    description: string;
    foundedDate: string;
    icon: string;
    location: string;
    sector: string;
    subIndustry: string;
    website: string;
    socialLinks: SocialLinks;
  }
  
  
  export interface CompanyData {
    companyId: ICompanyData;
    __v: number;
  }


  export interface IPaginatedCompaniesResponse {
    totalCompanies: number;         
    totalPages: number;             
    companies: ICompanyData[];     
}



export interface IGetUserApplicationResponse{
    _id?:string;
    companyName:string;
    jobTitle:string;
    appliedDate:string;
    hiringStatus:string
}


interface SubscriptionDetails {
  _id: string;
  userId: string;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  plan: string;
  status: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;   
  cancelAtPeriodEnd: boolean;
  amount: number;
  isExpired: boolean;
  createdAt: string; 
  updatedAt: string; 
  __v: number;
}

export interface ISubscriptionResponse {
  isSubscribed: boolean;
  subscriptionDetails: SubscriptionDetails;
}


export interface IGetSubscriptionResponse{
  name:string;
  email:string;
  plan:string;
  status:string;
  currentPeriodEnd:Date;
  amount:number;
  cancellationFeedback?:string;
  cancelAtPeriodEnd:boolean;
}



