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