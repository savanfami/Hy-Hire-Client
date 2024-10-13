import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { IApplicantProfileProps } from '../../types/companyTypes'

export const ApplicantResume:React.FC <IApplicantProfileProps> = ({userId}) => {
  
  const { applicantDetails } = useSelector((state: RootState) => state?.job)
  const applicantData = applicantDetails.find((data) => data.userDetails._id === userId)
  return (
    <div className="flex justify-center items-center h-screen">
    <iframe
      src={applicantData?.resume}
      title="Applicant Resume"
      width="100%"
      height="100%"
      style={{ border: 'none' }}
    />
  </div>
  )
}

