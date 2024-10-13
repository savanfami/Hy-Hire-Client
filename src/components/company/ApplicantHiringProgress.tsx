import React, { useState } from 'react';
import {  isBefore, startOfDay } from "date-fns";
import { ApplicationStatusBar } from './ApplicantionStatusBar';
import { IApplicantProfileProps } from '../../types/companyTypes';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import axios from 'axios';
import { URL } from '../../common/axiosInstance';
import { config } from '../../common/configurations';
import { DatePicker } from '../common/DateandTimePicker';
import { updateApplicationStatus } from '../../redux/action/companyAction';

export const ApplicantHiringProgress: React.FC<IApplicantProfileProps> = ({ userId }) => {
  const [error, setError] = useState<string | null>(null);
  const { applicantDetails } = useSelector((state: RootState) => state?.job)
  const applicantData = applicantDetails.find((data) => data.userDetails._id === userId)
  const [interviewDate, setInterviewDate] = useState<Date | null>(null);
  const [interviewTime, setInterviewTime] = useState<string>('');
  const dispatch:AppDispatch=useDispatch()

  const handleStatusChange = async (applicationId: string, status: string) => {
    const nextStage = getNextStage(status)
    if (nextStage === 'shortlisted' && (interviewDate === null || interviewTime === '')) {
      setError('Please select an interview date and time before proceeding');
      return;
    }
    setError(null)
    try {
      const payload = {
        applicationId,
        hiringStatus:nextStage,
        interviewDate: nextStage === 'shortlisted' ? interviewDate : undefined,
        interviewTime:nextStage==='shortlisted'?interviewTime:undefined
      }
      const response=await dispatch(updateApplicationStatus(payload)).unwrap()
      console.log(response)
      // const response = await axios.put(`${URL}/job/update-status`, payload,config)
      // console.log(response)
    } catch (error: any) {
      console.error('error updating status', error)
    }
  }



  const handleDateChange = (date: Date | null) => {
    const today = startOfDay(new Date());
    if (date && isBefore(startOfDay(date), today)) {
      setError('You cannot select a past date.');
      setInterviewDate(null);
    } else {
      setError(null);
      setInterviewDate(date);
    }
  };

  const handleTimeChange = (time: string) => {
    setInterviewTime(time);
  };

  const getNextStage = (currentStatus: string) => {
    const stages = ['in-review', 'shortlisted', 'interview']
    const currentIndex = stages.indexOf(currentStatus)
    if (currentIndex === -1 || currentIndex === stages.length - 1) {
      return currentStatus
    }
    return stages[currentIndex + 1]
  }


  return (
    <div className="flex flex-col w-full max-w-2xl max-md:max-w-full">
      <ApplicationStatusBar currentStatus={applicantData?.hiringStatus} />
      <div className="flex flex-col mt-5 max-w-full w-[538px]">
        <div className="flex flex-wrap gap-10 justify-between items-start mt-2 w-full">
          <div className="flex flex-col items-start text-base min-w-[240px] w-[267px]">
            <button onClick={() => handleStatusChange(applicantData?._id ?? '', applicantData?.hiringStatus ?? 'in-review')} className="p-2 rounded-md  font-semibold leading-relaxed text-center bg-blue-500 text-white">
              Move to next stage
            </button>
            <div className="flex flex-col mt-5 leading-relaxed w-[218px]  ">
              <div className="flex flex-col">
                <div className="text-base text-slate-500 mt-2">Interview Status</div>
                <div className="gap-2 mt-2 self-start px-2.5 py-1.5 text-md border-maincolr border text-maincolr font-semibold bg-gray-100 rounded-md">
                  {applicantData?.hiringStatus}
                </div>
              </div>
            </div>
            {applicantData?.hiringStatus === 'in-review' &&
              <div className="flex flex-col mt-6 leading-relaxed">
                <div className="text-slate-500">Interview Date</div>
                <div className="font-medium text-slate-800 ">
                  <DatePicker date={interviewDate} time={interviewTime} onDateChange={handleDateChange} onTimeChange={handleTimeChange}/>
                  {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};





