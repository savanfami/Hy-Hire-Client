import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { JobCard } from '../../components/user/JobCard'

export const DashboardJobListing = () => {

    const { jobs } = useSelector((state: RootState) => state?.job)
    console.log(jobs)
    return (
        <>
            <div className='col-span-12 md:col-span-9 xl:col-span-9 p-4 '>

                {jobs && jobs?.jobsWithDetails?.length > 0 ? (
                    jobs?.jobsWithDetails?.map((job: any) => (
                        <JobCard key={job._id} job={job} value='job Details' />
                    ))
                ) : (
                    <p>no jobs found</p>
                )}
            </div>
        </>
    )
}

