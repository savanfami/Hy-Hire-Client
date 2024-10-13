import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ApplicantDetail } from '../../components/company/ApplicantDetails'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { ApplicantProfile } from '../../components/company/ApplicantProfile'
import { ApplicantResume } from '../../components/company/ApplicantResume'
import { ApplicantHiringProgress } from '../../components/company/ApplicantHiringProgress'
import { ApplicantInterviewSchedule } from '../../components/company/ApplicantInterviewSchedule'
import { useNavigate, useParams } from 'react-router-dom'


export const ApplicantDetails = () => {
    const {id}=useParams()
    const navigate=useNavigate()
    return (
        <>
        <ArrowBackIcon onClick={()=>navigate(-1)} className='md:ml-2 cursor-pointer' fontSize='medium'/>
        <div className="md:grid grid-cols-12 gap-4 p-2">
            <div className="md:col-span-3 w-full ">
                <ApplicantDetail />
            </div>
         

            <div className="md:col-span-9 w-full  p-2">
                <Tabs defaultValue="profile" className="w-full ">
                    <TabsList className='gap-32 text-maincolr border border-gray-200' >
                        <TabsTrigger value="profile">Applicant Profile</TabsTrigger>
                        <TabsTrigger value="resume">Resume</TabsTrigger>
                        <TabsTrigger value="hiring">Hiring Progress</TabsTrigger>
                        <TabsTrigger value="interview">Interview Schedule</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile">
                        <ApplicantProfile userId={id as string} />
                    </TabsContent>
                    <TabsContent value="resume">
                        <ApplicantResume userId={id as string} />
                    </TabsContent>
                    <TabsContent value="hiring">
                        <ApplicantHiringProgress userId={id as string} />
                    </TabsContent>
                    <TabsContent value="interview">
                        <ApplicantInterviewSchedule />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
        </>
    )
}


