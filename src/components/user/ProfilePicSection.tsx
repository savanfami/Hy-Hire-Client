import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Pencil } from 'lucide-react';
import { AppDispatch, RootState } from '../../redux/store';
import { uploadToCloudinary } from '../../utils/common/cloudinaryUpload';
import { updateProfile } from '../../redux/action/userActions';
import { PlacesAutocomplete } from '../common/LocationFetch';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, "Invalid name format")
        .min(3, "min 3 characters required !"),
    location: Yup.string().required('Location is required').matches(/^(?!\s*$).+/, 'Location cannot be empty or contain only spaces'),
    aboutMe: Yup.string().max(500, 'About Me must be 500 characters or less').required('About Me is required'),
    image: Yup.mixed()
        .test('fileSize', 'File size must not exceed 5 MB', (value) => {
            if (value && value instanceof File) {
                return value.size <= 5 * 1024 * 1024; // 5 MB
            }
            return true;
        })
        .test('fileType', 'Only JPEG, PNG, and GIF images are supported', (value) => {
            if (value && value instanceof File) {
                return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
            }
            return true;
        })
});

export const ProfilePicSection: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const { user: { data } } = useSelector((state: RootState) => state?.user);
    console.log(data)
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dispatch: AppDispatch = useDispatch()

    const initialValues = {
        name: data?.name || '',
        location: data.location || '',
        aboutMe: data.aboutMe || '',
        image: data.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = (resetForm: () => void, setErrors: (errors: Record<string, string>) => void) => {
        setIsEditing(false);
        resetForm();
        setErrors({});
    };

    const handleSubmit = async (values: typeof initialValues, { setSubmitting }: FormikHelpers<typeof initialValues>) => {
        try {
            if (values.image instanceof File) {
                setIsUploading(true);
                const cloudinaryUrl = await uploadToCloudinary(values.image);
                values.image = cloudinaryUrl;
                setIsUploading(false);
            }
            await dispatch(updateProfile(values)).unwrap()
            setIsEditing(false);

        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        setFieldTouched: (field: string, touched?: boolean, shouldValidate?: boolean) => void
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            setFieldTouched('image', true, true);
            setFieldValue('image', file, true);  // This will trigger validation
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, errors, touched, isSubmitting, setFieldValue, resetForm, setFieldTouched, setErrors }) => (
                <Form>
                    {/* Cover Image */}
                    <img
                        src="https://img.freepik.com/free-photo/plain-smooth-green-wall-texture_53876-129746.jpg"
                        className="object-cover h-40 w-full"
                        alt="Cover"
                    />

                    {/* Profile Section */}
                    <div className="flex flex-col sm:flex-row items-start mt-16 sm:mt-6 px-4 relative">
                        <div className="">
                            <img
                                src={values.image instanceof File ? URL.createObjectURL(values.image) : values.image}
                                className="w-32 h-32 rounded-full border-4 border-white absolute ml-20 max-sm:ml-20 md:ml-0 md:-top-16 -top-32 left-4 cursor-pointer"
                                alt="Profile"
                                onClick={() => isEditing && fileInputRef.current?.click()}
                            />
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, setFieldValue, setFieldTouched)}
                                style={{ display: "none" }}
                            />
                            {errors.image && touched.image && (
                                <div className="text-red-500 mt-20 ml-20 md:ml-0">{errors.image as string}</div>
                            )}
                        </div>
                        <div className="mt-5 max-sm:ml-24 md:ml-44 sm:mt-0 ml-20 flex flex-col w-full sm:w-auto">
                            <div className="text-2xl font-semibold text-slate-800 font-sans flex items-center">
                                {isEditing ? (
                                    <Field
                                        as={Input}
                                        name="name"
                                        className={`mr-2 ${errors.name && touched.name ? 'border-red-500' : ''}`}
                                    />
                                ) : (
                                    values.name
                                )}
                            </div>
                            {errors.name && touched.name && <div className="text-red-500">{typeof errors.name === 'string' ? errors.name : 'Error occurred'}</div>}

                            <div className="flex items-center mt-2 md:-ml-6 text-slate-500">
                                {isEditing ? (
                                    <PlacesAutocomplete
                                        onSelect={(location) => setFieldValue('location', location)}
                                        initialValue={values.location}
                                    />
                                ) : (
                                    <>
                                    <LocationOnIcon className='text-gray-400 ml-5'/><p className='ml-1'>{values.location}</p>
                                    </>
                                )}
                            </div>
                            {errors.location && touched.location && <div className="text-red-500">{typeof errors.location === 'string' ? errors.location : 'Error occurred'}</div>}
                        </div>
                    </div>

                    {/* About Me Section */}
                    <div className="mt-10 ml-5 px-4">
                        <h2 className="text-xl font-semibold mb-4">About Me</h2>
                        {isEditing ? (
                            <Field
                                as={Textarea}
                                name="aboutMe"
                                placeholder="Tell us about yourself"
                                className={`w-full mb-4 ${errors.aboutMe && touched.aboutMe ? 'border-red-500' : ''}`}
                            />
                        ) : (
                            values.aboutMe && <p className="text-slate-700 mb-4">{values.aboutMe}</p>
                        )}
                        {errors.aboutMe && touched.aboutMe && <div className="text-red-500">{typeof errors.aboutMe === 'string' ? errors.aboutMe : 'Error occurred'}</div>}
                    </div>

                    {/* Submit and Cancel Buttons */}
                    <div className="px-4 mb-4 flex justify-end">
                        {isEditing ? (
                            <div className="flex gap-2">
                                <Button type="submit" disabled={isSubmitting || isUploading}>
                                    {isSubmitting || isUploading ? 'Submitting...' : 'Submit'}
                                </Button>
                                <Button variant="outline" onClick={() => handleCancelClick(resetForm, setErrors)}>Cancel</Button>
                            </div>
                        ) : (
                            <Button className='bg-maincolr text-white' onClick={handleEditClick}>
                                <Pencil className="h-4 w-4 mr-2 " /> Edit Profile
                            </Button>
                        )}
                    </div>
                </Form>
            )}
        </Formik>
    );
};