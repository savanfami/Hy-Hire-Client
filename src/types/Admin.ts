export type adminReducer = {
    loading: boolean,
    request: any[],
    // users: any[],
    err: null | any,
    role: 'admin' | null
}


export interface Company{
    name?:string;
    email?:string;
    password?:string;
    isBlocked?:boolean;
    companyDescription?:string;
    contact?:string;
    location?:string;
    foundedDate?:Date;
    subIndustry?:string
    website?:string;
    icon?:string;
    sector?:string;
    socialLinks?:SocialLinks;
}

export interface SocialLinks {
    instagram?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    linkedIn?: string | null;
  }
  

  export interface requestType{
    reason?:string;
    companyId:string;
    status:string;
  }