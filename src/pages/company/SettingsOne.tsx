import React, { useEffect, useRef, useState } from 'react';
import { FaTimes, FaUpload } from 'react-icons/fa';
import industryData from '../../assets/jsonData/Industry.json';
import { uploadToCloudinary } from '../../utils/common/cloudinaryUpload';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getCompany, updateCompany } from '../../redux/action/companyAction';
import { FormDatas } from '../../types/Alltypes';
import toast, { Toaster } from 'react-hot-toast';


interface FormErrors {

    name?: string;
    website?: string;
    location?: string;
    foundedDate?: string;
    sector?: string;
    subIndustry?: string;
    companyDescription?: string;
    icon?: string;
}

type Industry = {
    sector: string;
    subIndustries: string[];
};

export const SettingsOne: React.FC = () => {
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [icon, setIcon] = useState<File | null>(null);
    const [iconPreview, setIconPreview] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormDatas>({
        name: '',
        website: '',
        location: '',
        foundedDate: '',
        sector: '',
        subIndustry: '',
        companyDescription: '',
    });
    const [industries, setIndustries] = useState<Industry[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { user: { data } } = useSelector((state: RootState) => state.user)
    const formattedDate = data?.foundedDate?.split('T')[0] ||''
    //    console.log(formattedDate)
    useEffect(() => {
        if (data) {
            setFormData({
                name: data.name || '',
                website: data.website || '',
                location: data.location || '',
                sector: data.sector || '',
                subIndustry: data.subIndustry || '',
                foundedDate: formattedDate || '',
                companyDescription: data.description
            })
            if (data.icon) {
                setIconPreview(data.icon)
            }
        }
    }, [data])

    const dispatch: AppDispatch = useDispatch()


    useEffect(() => {
        setIndustries(industryData.industries);
    }, []);

    const validateForm = (): FormErrors => {
        let errors: FormErrors = {};

        if (!formData.name.trim()) {
            errors.name = 'Company name is required';
        }

        if (!formData.website.trim()) {
            errors.website = 'Website is required';
        } else if (!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(formData.website)) {
            errors.website = 'Invalid website URL';
        }

        if (!formData.location.trim()) {
            errors.location = 'Location is required';
        }

        if (!formData.foundedDate) {
            errors.foundedDate = 'Founded date is required';
        }

        if (!formData.sector) {
            errors.sector = 'Industry sector is required';
        }

        if (!formData.subIndustry) {
            errors.subIndustry = 'Sub-industry is required';
        } else {
            const currentDate = new Date()
            const foundedDate = new Date(formData.foundedDate)

            if (foundedDate > currentDate) {
                errors.foundedDate = 'founded date cannot be in the future'
            }
        }

        if (!formData.companyDescription.trim()) {
            errors.companyDescription = 'Company description is required';
        } else {
            if (formData.companyDescription && formData.companyDescription.length > 500) {
                errors.companyDescription = 'Description cannot exceed 500 characters';
            }
        }

        if (!iconPreview && !icon) {
            errors.icon = 'Company logo is required';
        }

        return errors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


    const fetchData = async () => {
        try {
            await dispatch(getCompany()).unwrap()
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        fetchData()
    }, [])





    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const validFormats = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!file) {
            setIcon(null);
            setIconPreview(null);
            return;
        }

        if (validFormats.includes(file.type)) {
            setIcon(file);
            setIconPreview(URL.createObjectURL(file));
            setFormErrors(prev => ({ ...prev, icon: undefined }));
        } else {
            setIcon(null);
            setIconPreview(null);
            setFormErrors(prev => ({ ...prev, icon: 'Only JPEG, PNG, and JPG formats are supported.' }));
        }
    };



    const removeIcon = () => {
        setIcon(null);
        setIconPreview(null);
        setFormErrors(prev => ({ ...prev, icon: undefined }));
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };




    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let errors = validateForm();
        if (Object.keys(errors).length === 0) {
            // errors={}
            try {
                let iconUrl = iconPreview || '';
                console.log(icon, 'icon')
                if (icon) {
                    console.log('indise', icon)
                    iconUrl = await uploadToCloudinary(icon);
                }

                const dataToSend = {
                    ...formData,
                    icon: iconUrl,
                    profileCompleted:true
                };
                console.log(dataToSend, 'data to send')

                const response = await dispatch(updateCompany(dataToSend)).unwrap()
                console.log(response)
                if (response) {
                    toast.success(response?.message as string)
                    setFormErrors({});  

                }else{
                    toast.error('some error occured')
                }
            } catch (error) {
                toast.error('some error occured in form submission')
                console.error('Error submitting form:', error);
                // Handle error (e.g., show error message)
            }
        } else {
            setFormErrors(errors);
        }
    };


    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className='h-20 flex-col items-center pl-5'>
                <h1 className='text-xl font-gg mt-3'>Basic information</h1>
                <h5 className='text-sm mt-3 text-gray-400'>This is the information you can update anytime.</h5>
            </div>
            <hr className="border-t border-gray-300" />

            <div className='mt-4'>
                <h1 className='text-lg pl-3 font-gg mb-4'>Company Logo</h1>
                <div className='grid grid-cols-2 gap-6 items-center'>
                    <div>
                        <h5 className='text-sm mt-3 pl-3 text-gray-400'>
                            This image will be shown publicly as a company logo
                        </h5>
                    </div>
                    <div className='flex items-center'>
                        <input
                            className='hidden'
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={handleImage}
                            ref={fileInputRef}
                        />
                        <button
                            onClick={triggerFileInput}
                            className="flex justify-center text-maincolr outline-dashed outline-2 w-full md:w-auto border-maincolr items-center p-6 rounded-md"
                        >
                            <FaUpload className="mr-2" />
                            Upload Logo
                        </button>
                        {iconPreview && (
                            <div className="relative pl-4">
                                <img
                                    className='h-36 w-52 object-contain rounded-md'
                                    src={iconPreview}
                                    alt="company logo"
                                />
                                <button
                                    onClick={removeIcon}
                                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        )}
                        {formErrors.icon && <p className="text-red-600 text-sm mt-1 pl-5">{formErrors.icon}</p>}
                    </div>
                </div>
            </div>

            <hr className="border-t border-gray-300 mt-8" />

            <div className='pl-3 pr-3 mt-4'>
                <h1 className='text-lg font-gg mb-4'>Company Details</h1>
                <div className='grid grid-cols-2 gap-6'>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Company Name</label>
                        <input
                            name='name'
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-maincolr focus:border-maincolr"
                        />
                        {formErrors.name && <p className="text-red-600 text-sm mt-1">{formErrors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website</label>
                        <input
                            name='website'
                            id="website"
                            value={formData.website}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-maincolr focus:border-maincolr"
                        />
                        {formErrors.website && <p className="text-red-600 text-sm mt-1">{formErrors.website}</p>}
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            name='location'
                            type="text"
                            id="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-maincolr focus:border-maincolr"
                        />
                        {formErrors.location && <p className="text-red-600 text-sm mt-1">{formErrors.location}</p>}
                    </div>
                    <div>
                        <label htmlFor="foundedDate" className="block text-sm font-medium text-gray-700">Founded Date</label>
                        <input
                            name='foundedDate'
                            type="date"
                            id="foundedDate"
                            value={formData.foundedDate}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-maincolr focus:border-maincolr"
                        />
                        {formErrors.foundedDate && <p className="text-red-600 text-sm mt-1">{formErrors.foundedDate}</p>}
                    </div>
                    <div>
                        <label htmlFor="sector" className="block text-sm font-medium text-gray-700">Industry Sector</label>
                        <select
                            name='sector'
                            id="sector"
                            value={formData.sector}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-maincolr focus:border-maincolr"
                        >
                            <option value="">Select Sector</option>
                            {industries.map((industry) => (
                                <option key={industry.sector} value={industry.sector}>
                                    {industry.sector}
                                </option>
                            ))}
                        </select>
                        {formErrors.sector && <p className="text-red-600 text-sm mt-1">{formErrors.sector}</p>}
                    </div>

                    <div>
                        <label htmlFor="subIndustry" className="block text-sm  font-medium text-gray-700">Sub-Industry</label>
                        <select
                            name='subIndustry'
                            id="subIndustry"
                            value={formData.subIndustry}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-maincolr focus:border-maincolr"
                            disabled={!formData.sector}
                        >
                            <option value="">Select Sub-Industry</option>
                            {formData.sector && industries
                                .find((industry) => industry.sector === formData.sector)
                                ?.subIndustries.map((subIndustry) => (
                                    <option key={subIndustry} value={subIndustry}>
                                        {subIndustry}
                                    </option>
                                ))}
                        </select>
                        {formErrors.subIndustry && <p className="text-red-600 text-sm mt-1">{formErrors.subIndustry}</p>}
                    </div>
                    <div className='col-span-2'>
                        <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700">Company Description</label>
                        <textarea
                            name='companyDescription'
                            id="companyDescription"
                            value={formData.companyDescription}
                            onChange={handleChange}
                            rows={4}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-maincolr focus:border-maincolr"
                        />
                        {formErrors.companyDescription && <p className="text-red-600 text-sm mt-1">{formErrors.companyDescription}</p>}
                    </div>
                </div>
            </div>

            <div className="flex justify-end pr-3 mt-8">
                <button
                    onClick={handleSubmit}
                    className="p-3  bg-maincolr text-white   leading-tight  rounded-md "
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};
