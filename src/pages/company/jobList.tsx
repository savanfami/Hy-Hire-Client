import React, { useEffect, useState } from 'react'
import { SearchBar } from '../../components/admin/SeachBar'
import { URL } from '../../common/axiosInstance'

import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import axios from 'axios'
import { config } from '../../common/configurations'
import { jobs } from '../../types/jobTypes'
import { formatDate } from '../admin/UserListing'
import { PaginationSection } from '../../components/common/PaginationSection'
import { FadeLoader } from 'react-spinners'

export const JobList = () => {
   
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const itemPerPage = 5
    const [jobs, setJobs] = useState<jobs[]>([])
    const [totalJobs, setTotalJobs] = useState(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true)
    const lastItemIndex = currentPage * itemPerPage
    const firstItemIndex = lastItemIndex - itemPerPage
    const currentItems = jobs.slice(firstItemIndex, lastItemIndex)


    const { user: { data } } = useSelector((state: RootState) => state?.user)



    useEffect(() => {
        fetchJobs()
    }, [searchQuery, currentPage])

    const handleSearch = (query: string) => {
        
        setSearchQuery(query)
        setCurrentPage(1)
        setIsInitialLoad(false)

    }

    const fetchJobs = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.get(`${URL}/job/list-jobs`, {
                params: {
                    page: currentPage,
                    search: searchQuery,
                    companyId: data?._id
                },
                ...config
            })
            setLoading(false)
            setJobs(response.data.jobs)
            const totaljobs = response.data.jobs.length
            setTotalJobs(totaljobs)

            // const totalPages = Math.ceil(response.data.TotalJobs / itemPerPage)
            // setTotalpage(totalPages)
            // setTotalpage(totalPages)
            // const startIndex = (currentPage - 1) * itemPerPage
            // const endIndex = startIndex + itemPerPage
            // const currentItems = response.data.slice(startIndex, endIndex)



        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
            setIsInitialLoad(false)
        }
    }
    // console.log(state)
    
    if (isInitialLoad&&loading) {
        return <div className="flex justify-center items-center h-[480px]"><FadeLoader /></div>
    }
    return (
        <>
            
            <SearchBar values={`Total Jobs:${totalJobs}`} onSearch={handleSearch} />
            
            {totalJobs === 0 ? (
                <div className='flex justify-center items-center' >
                    <img className='h-[470px] w-[450px]' src="https://img.freepik.com/premium-vector/vector-illustration-about-concept-no-items-found-no-results-found_675567-6665.jpg?size=626&ext=jpg&ga=GA1.1.857803910.1725824513&semt=ais_hybrid" alt="" />
                </div>
            ) : error ? (
                <p className='text-red-600'>{error}</p>
            ) : (
                <>
                    <div className='h-[480px]'>

                        <table className="min-w-full  bg-white border border-gray-300 shadow-sm rounded-lg overflow-hidden font-serif font-medium">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Posted</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">

                                {currentItems.map((job) => (
                                    <tr key={job._id}>
                                        <td className='px-6 py-4 whitespace-nowrap'>{job.jobTitle}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{job.status}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{formatDate(job.createdAt as string)}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{formatDate(job.endDate as string)}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{job.employmentType}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </>
            )}

            <PaginationSection totalJobs={totalJobs} itemPerPage={itemPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />

            
        </>
    )
}





