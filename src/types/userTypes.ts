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