import React, { useState } from 'react'
import { JobCard } from '../../components/user/JobCard'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import DoneIcon from '@mui/icons-material/Done';
const JobDetailsPage = () => {

    const { id } = useParams()
    const { jobs } = useSelector((state: RootState) => state?.job)
    const findJobById = jobs.find((job: any) => job?._id === id)
    console.log(findJobById)

    return (
        <>
       
            <div className='mx-10 mt-5 '>
                  
                <JobCard job={findJobById} value='Apply Job' />
                <div>
                    <h1 className='italic text-2xl p-4 md:px-10'>Job Description</h1>
                    <p className='italic text-lg md:px-10 py-4 md:py-2'>{findJobById?.jobDescription}</p>
                    <h1 className='italic text-2xl p-4 md:px-10'>Key Responsibilities</h1>
                    {findJobById.responsibilityInput.map((item: any, index: any) =>
                        <p key={index} className='italic text-lg p-2 md:px-10'><DoneIcon className='text-green-600 mr-2 ' /> {item}</p>
                    )}
                    <h1 className='italic text-2xl p-4 md:px-10'>Professional Skills</h1>
                    <div className='flex flex-wrap gap-4 md:px-10 '>  <DoneIcon className='text-green-600 mt-3  ' />
                        {findJobById.skillInput.map((item: any, index: any) => (
                            <span key={index} className='italic text-lg p-2'>
                                {item}
                            </span>
                        ))}
                    </div>
                    <h1 className='italic text-2xl p-4 md:px-10'>Qualifications</h1>
                    {findJobById.qualificationInput.map((item: any, index: any) =>
                        <p key={index} className='italic text-lg p-2 md:px-10'><DoneIcon className='text-green-600 mr-2 ' /> {item}</p>
                    )}

                    <h1 className='italic text-4xl md:mt-14 mt-4 md:px-10'>Related Jobs</h1>

                </div>
            </div>
        </>
    )
}

export default JobDetailsPage
