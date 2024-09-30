import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { JobCard } from '../../components/user/JobCard'
import { IJobFilterParams } from '../../types/jobTypes'
import { getAllJob } from '../../redux/action/jobAction'
import { InfinitySpin } from 'react-loader-spinner'
import { PaginationComponent } from '../../components/common/PaginationComponent'

export const DashboardJobListing = () => {

    // const { jobs } = useSelector((state: RootState) => state?.job)
    const dispatch:AppDispatch=useDispatch()
    const [jobs,setJobs]=useState<any>(null)
    const [totalJobs, setTotalJobs] = useState<number>(0);
    const jobsPerPage = 4;
    const totalPages = Math.ceil(totalJobs / jobsPerPage);
    const [loading,setLoading]=useState<boolean>(false)
    const [page, setPage] = useState<number>(1);

    const handlePageChange = (newPage: number) => {
      if (newPage > 0 && newPage <= totalPages) {
        setPage(newPage);
      }
    };

    const fetchData = async (filterData: IJobFilterParams = {  page: 1 }) => {
        try {
            setLoading(true)
          const res = await dispatch(getAllJob(filterData)).unwrap()
          console.log(res)
          setJobs(res)
          setLoading(false)
          if (res) {
            setTotalJobs(res?.count)
          }
        } catch (error: any) {
          console.log(error)
        }finally{
            setLoading(false)
        }
      }
      useEffect(() => {
        console.log('use effect called')
        fetchData({page})
      }, [page])
    return (
        <>
        {loading?(
             <div className="flex justify-center items-center h-screen">
             <InfinitySpin
               width="200"
               color="#4fa94d"
             />
           </div>
        ):(
            <div className='col-span-12 md:col-span-9 xl:col-span-9 p-4 '>

                {jobs && jobs?.jobsWithDetails?.length > 0 ? (
                    jobs?.jobsWithDetails?.map((job: any) => (
                        <JobCard key={job._id} job={job} value='job Details' />
                    ))
                ) : (
                    <p className='text-red-500 font-ff font-3xl text-center'>NO JOBS FOUND</p>
                )}
            </div>
        )}
        {jobs&&jobs?.jobsWithDetails?.length &&
        <PaginationComponent  onPageChange={handlePageChange} page={page} totalPages={totalPages}/>
        }
        </>
    )
}

