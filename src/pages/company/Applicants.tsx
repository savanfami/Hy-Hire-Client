import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Animation from '../../../src/assets/lottieFiles/Animation - 1728364855202.json'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { useNavigate, useParams } from 'react-router-dom'
import { listUsersByJobId } from '../../redux/action/jobAction'
import { formateDatetoThree } from '../../utils/common/formatDate'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Lootie from 'lottie-react'
import { PaginationSection } from '../../components/common/PaginationSection'
export const ListApplicants = () => {
    const { id } = useParams<{ id: string }>()
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const fetchData = async () => {
        try {
            if (!id) {
                console.log('no job id found')
                return
            }
            await dispatch(listUsersByJobId(id)).unwrap()
        } catch (error) {
            console.log(error)
        }
    }

    const getStatusClass = (hiringStatus: string) => {
        switch (hiringStatus) {
            case 'in-review':
                return 'text-yellow-600 border border-yellow-400 p-2 rounded-full ';
            case 'shortlisted':
                return 'text-green-500 border border-green-300 p-2 rounded-full ';
            case 'interview':
                return 'text-blue-600 border border-blue-400 p-2 rounded-full ';
            case 'hired':
                return 'text-green-600 border border-green-500 p-2 rounded-full ';
            case 'rejected':
                return 'text-red-600 border border-red-400 p-2 rounded-full ';
            default:
                return '';
        }
    };

    const { applicantDetails } = useSelector((state: RootState) => state?.job)
    const totalData=applicantDetails.length
    const itemPerPage=5
    const [currentPage, setCurrentPage] = useState<number>(1)
    const lastItemIndex = currentPage * itemPerPage
    const firstItemIndex = lastItemIndex - itemPerPage
    const currentItems = applicantDetails.slice(firstItemIndex, lastItemIndex)

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <ArrowBackIcon onClick={() => navigate(-1)} className='md:ml-2 cursor-pointer mb-4' fontSize='medium' />
            {currentItems && currentItems.length > 0 ? (
                <div className='h-[520px]'>
                    <table className="min-w-full  bg-white border border-gray-300 shadow-sm rounded-lg overflow-hidden font-serif font-medium">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th> */}
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hiring Stage</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">See Application</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white  divide-gray-200">
                            {currentItems.map((data) => (
                                <tr key={data._id}>
                                    <td className='px-6 py-4 whitespace-nowrap'>{data.userDetails.name}</td>
                                    <td className={`px-6 py-4 whitespace-nowrap  p-2 rounded-md`}>
                                        <span className={`${getStatusClass(data.hiringStatus)}`}>
                                            {data.hiringStatus}
                                        </span>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>{formateDatetoThree(data.createdAt)}</td>
                                    <td><button onClick={() => navigate(`/company/jobs/applicant-details/${data.userDetails._id}`)} className='bg-gray-200 p-2 rounded-md border border-maincolr text-maincolr font-bold'>See Application</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='md:mt-5'>
                    <PaginationSection  totalJobs={totalData} itemPerPage={itemPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage}  />
                    </div>
                </div>
            ) : (
                <div className='flex justify-center'>
                    <Lootie className='md:h-[600px]'
                        animationData={Animation} />
                </div>
            )}
        </>
    )
}

