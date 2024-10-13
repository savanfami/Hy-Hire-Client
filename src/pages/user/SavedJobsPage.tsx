import React, { useState } from 'react'
import { JobCard } from '../../components/user/JobCard'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { PaginationSection } from '../../components/common/PaginationSection'

export const SavedJobs = () => {
  const state = useSelector((state: RootState) => state?.user)
  const jobs = state.savedJobs as any
  const itemPerPage = 3
  const [currentPage, setCurrentPage] = useState<number>(1)
  const lastItemIndex = currentPage * itemPerPage
  const firstItemIndex = lastItemIndex - itemPerPage
  const currentItems = jobs?.jobsWithDetails.slice(firstItemIndex, lastItemIndex)
  const totalJobs = jobs.jobsWithDetails?.length
  return (
    <>
      {currentItems && currentItems?.length > 0 ? (
        currentItems.map((job: any) => (
          <JobCard job={job} key={job._id} value='job details' />
        ))

      ) : (
        <p className='text-red-500 items-center font-semibold'>NO JOBS SAVED </p>
      )}
      {currentItems && currentItems.length>0 && 
      <PaginationSection currentPage={currentPage} setCurrentPage={setCurrentPage} itemPerPage={itemPerPage} totalJobs={totalJobs} />
      }
    </>
  )
}


