import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../common/axiosInstance';
import { config } from '../../common/configurations';
import { InfinitySpin } from 'react-loader-spinner';
interface JobApplication {
    jobRole: string;
    jobType: string;
    salaryMin: string;
    salaryMax: string;
    postedDate: string;
    companyName: string;
    companyLocation: string;
    companyDescription: string;
    applicantName: string;
    resume: string;
    skills: string[]
}



export const JobApplicationDetails: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const { id } = useParams()
    const [data, setData] = useState({
        jobRole: '',
        jobType: '',
        salaryMin: '',
        salaryMax: '',
        postedDate: '',
        companyName: '',
        companyLocation: '',
        companyDescription: '',
        applicantName: '',
        resume: '',
        skills: ['']
    })

    const fetchJobApplicationDetails = async () => {
        setLoading(true)
        const { data } = await axios.get(`${URL}/job/applications/${id}`, config)
        setLoading(false)

        if (data) {
            setData(data)
        }
    }

    useEffect(() => {
        fetchJobApplicationDetails()
    }, [])

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <InfinitySpin width="200" color="#4fa94d" />
                </div>
            ) : (
                <div className='grid md:grid-cols-12'>
                    <div className='md:col-span-4'>
                        <img src="https://img.freepik.com/premium-vector/professional-hands-holding-cv-candidate-job-application-concept_1323048-61905.jpg?ga=GA1.1.857803910.1725824513&semt=ais_hybrid" alt="" />
                    </div>
                    <div className='md:col-span-8 '>
                        <div className=" mx-auto  p-8 bg-gray-100  rounded-xl shadow-md">
                            <h1 className="text-3xl font-bold mb-6 text-maincolr"> <ArrowBackIcon className='cursor-pointer' onClick={() => navigate(-1)} fontSize='medium' /> {data.jobRole}  </h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h2 className="text-2xl font-semibold mb-4 text-maincolr">Job Details</h2>
                                    <p className="mb-2"><span className="font-medium text-gray-700">Role:</span> {data.jobRole}</p>
                                    <p className="mb-2"><span className="font-medium text-gray-700">Type:</span> {data.jobType}</p>
                                    <p className="mb-2"><span className="font-medium text-gray-700">Salary Range:</span> {data.salaryMin} - {data.salaryMax}</p>
                                    <p className="mb-2">
                                        <span className="font-medium text-gray-700">Required skills :-</span>
                                        {data.skills.map((x, index) => (
                                            <span key={index} className="block ">{x}</span>
                                        ))}
                                    </p>



                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h2 className="text-2xl font-semibold mb-4 text-maincolr">Company Information</h2>
                                    <p className="mb-2"><span className="font-medium text-gray-700">Name:</span> {data.companyName}</p>
                                    <p className="mb-2"><span className="font-medium text-gray-700">Location:</span> {data.companyLocation}</p>
                                    <p className="mb-2"><span className="font-medium text-gray-700">Description:</span> {data.companyDescription}</p>
                                </div>
                            </div>
                            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                                <p className="mb-2">
                                    <span className="font-medium text-gray-700">Applied Resume:</span>
                                    <a href={data.resume} className="ml-2 text-maincolr hover:underline">View Resume</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};