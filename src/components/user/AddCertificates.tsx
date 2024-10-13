import React, { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Plus } from 'lucide-react';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { uploadToCloudinary } from '../../utils/common/cloudinaryUpload';
import { updateProfile } from '../../redux/action/userActions';
import * as Yup from "yup";
export const AddCertificates = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = () => {
        setIsOpen(false);
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger>
                <Plus className='border border-gray-300 h-8 w-8 text-maincolr' />
            </AlertDialogTrigger>
            <AlertDialogContent className='bg-white'>
                <AlertDialogHeader>
                    <AlertDialogTitle>ADD CERTIFICATE</AlertDialogTitle>
                </AlertDialogHeader>
                <CertificateForm onSubmit={handleSubmit} />
            </AlertDialogContent>
        </AlertDialog>
    );
};

interface CertificateFormValues {
    certificateName: string;
    issuingOrganization: string;
    certificateImage: File | string;
}


const CertificateForm: React.FC<any> = ({ onSubmit }) => {
    const dispatch: AppDispatch = useDispatch();
    
    const validationSchema = Yup.object({
        certificateName: Yup.string()
            .trim()
            .required('Certificate name is required')
            .matches(/^(?!\s*$).+/, 'Cannot contain only whitespace'),
        issuingOrganization: Yup.string()
            .trim()
            .required('Issuing organization is required')
            .matches(/^(?!\s*$).+/, 'Cannot contain only whitespace'),
        certificateImage: Yup.mixed()
            .test('fileFormat', 'Unsupported file format', (value: any) => {
                return value ? ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type) : true;
            }),
    });
    
    const {user:{data}} = useSelector((state: RootState) => state?.user);
    const formik = useFormik<CertificateFormValues>({
        initialValues: {
            certificateName: '',
            issuingOrganization: '',
            certificateImage: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                let imageUrl = '';
                if (values.certificateImage instanceof File) {
                    imageUrl = await uploadToCloudinary(values.certificateImage);
                }

                const existingCertificates = data?.certificates || [];
                const newCertificate = {
                    certificateName: values.certificateName,
                    issuingOrganization: values.issuingOrganization,
                    certificateImage: imageUrl,
                };
                const formData = {
                    certificates: [...existingCertificates, newCertificate]
                };
         
                await dispatch(updateProfile(formData)).unwrap();
                onSubmit(); 
            } catch (error) {
                console.error('Error submitting the form:', error);
            }
        },
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0] || null;
        formik.setFieldValue('certificateImage', file);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="certificateName">
                    Certificate Name
                </label>
                <input
                    type="text"
                    id="certificateName"
                    name="certificateName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.certificateName}
                />
                {formik.touched.certificateName && formik.errors.certificateName ? (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.certificateName}</div>
                ) : null}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="issuingOrganization">
                    Issuing Organization
                </label>
                <input
                    type="text"
                    id="issuingOrganization"
                    name="issuingOrganization"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.issuingOrganization}
                />
                {formik.touched.issuingOrganization && formik.errors.issuingOrganization ? (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.issuingOrganization}</div>
                ) : null}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="certificateImage">
                    Certificate Image (Optional)
                </label>
                <input
                    type="file"
                    id="certificateImage"
                    name="certificateImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full"
                />
                {formik.errors.certificateImage && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.certificateImage as string}</div>
                )}
            </div>

            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction type="button" onClick={() => formik.handleSubmit()}>Submit</AlertDialogAction>
            </AlertDialogFooter>
        </form>
    );
};

export default CertificateForm;
