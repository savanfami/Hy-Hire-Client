import React, { useState } from 'react'
import { JobCard } from '../../components/user/JobCard'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import DoneIcon from '@mui/icons-material/Done';
import { Button } from '../../components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../components/ui/alert-dialog'
import { ToastContainer, toast } from 'react-toastify';
import { applyJob } from '../../redux/action/jobAction'
import { IApplyJobPayload } from '../../types/jobTypes'

const JobDetailsPage = () => {
    const { id } = useParams()
    const { jobs } = useSelector((state: RootState) => state?.job)
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedResume, setSelectedResume] = useState<string | null>(null);
    
    const { user } = useSelector((state: RootState) => state?.user)
    
    const isLoggedIn = !!user?.data 

    const findJobById = jobs?.jobsWithDetails?.find((job: any) => job?._id === id)

    const handleResumeSelection = (resumeUrl: string) => {
        setSelectedResume(resumeUrl);
    };

    const applyForJob = async () => {
        try {
            if (!isLoggedIn) {
                toast.info('Please log in to apply for this job.');
                console.log('lfjdsl')
                navigate('login'); 
                console.log('jdslfds')
                return;
            }

            if (selectedResume) {
                const payload: IApplyJobPayload = {
                    jobId: id as string,
                    resume: selectedResume,
                    companyId: findJobById?.companyDetails?._id
                }
                let result = await dispatch(applyJob(payload)).unwrap()
                setModalOpen(false);
                if(result){
                    toast.success('Application submitted successfully!')
                }else{
                    console.log('failed to submit application')
                }
            } else {
                toast.error('Please select a resume to apply for the job.')
            }
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response?.data?.message || 'Something went wrong';
                toast.info(errorMessage);
            } else {
                toast.error('An error occurred while applying for the job.');
            }
        }
    };

    const handleApplyButtonClick = () => {
        if (!isLoggedIn) {
            toast.info('Please login to apply for the job.');
                // navigate('/login')
            return;
        }

        // if (user.data?.resumes && user.data?.resumes.length>0) {
            setModalOpen(true);
        // } else {
        //     toast.info('Please add resume before applying');
        // }
    };

    return (
        <>
            <ToastContainer position='top-right' />
            
            {isLoggedIn && (
                <AlertDialog open={modalOpen} onOpenChange={setModalOpen}>
                    <AlertDialogContent className='bg-white'>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Select a Resume</AlertDialogTitle>
                            <AlertDialogDescription>
                                Please select one of your resumes to apply for this job.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className='p-4 max-h-[60vh] overflow-y-auto'>
                            {user.data?.resumes?.length > 0 ? (
                                <ul className='space-y-6'>
                                    {user.data.resumes.map((resumeUrl: string, index: number) => (
                                        <li key={index} className='flex flex-col gap-4 border-b pb-4'>
                                            <div className='flex items-center gap-2'>
                                                <input
                                                    type='radio'
                                                    id={`resume-${index}`}
                                                    name='resume'
                                                    value={resumeUrl}
                                                    checked={selectedResume === resumeUrl}
                                                    onChange={() => handleResumeSelection(resumeUrl)}
                                                    className='form-radio h-5 w-5 text-blue-600'
                                                />
                                                <label htmlFor={`resume-${index}`} className='font-medium'>
                                                    Resume {index + 1}
                                                </label>
                                            </div>
                                            <iframe
                                                src={resumeUrl}
                                                className='w-full h-64 border rounded'
                                                title={`Resume ${index + 1} Preview`}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <>
                                <p className='text-center text-red-600 '>No resumes available<br></br>
                                Please upload a resume to apply for the job</p>
                               <br></br>
                             <Link to='/profile/profile'>  <p className='text-center text-maincolr font-semibold  underline'>click here to add</p></Link>
                                </>
                            )}
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setModalOpen(false)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction className='bg-maincolr text-white ' onClick={applyForJob}>
                                Apply
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}

            <div className='mx-10 mt-5'>
                <JobCard job={findJobById} value='Apply' onApply={handleApplyButtonClick} />
                
                {/* Job Description and Details */}
                <div>
                    <h1 className='italic text-2xl p-4 md:px-10'>Job Description</h1>
                    <p className='italic text-lg md:px-10 py-4 md:py-2'>{findJobById?.jobDescription}</p>
                    <h1 className='italic text-2xl p-4 md:px-10'>Key Responsibilities</h1>
                    {findJobById?.responsibilityInput?.map((item: any, index: any) =>
                        <p key={index} className='italic text-lg p-2 md:px-10'>
                            <DoneIcon className='text-green-600 mr-2 ' /> {item}
                        </p>
                    )}
                    <h1 className='italic text-2xl p-4 md:px-10'>Professional Skills</h1>
                    <div className='flex flex-wrap gap-4 md:px-10 '>
                        <DoneIcon className='text-green-600 mt-3  ' />
                        {findJobById?.skillInput?.map((item: any, index: any) => (
                            <span key={index} className='italic text-lg p-2'>
                                {item}
                            </span>
                        ))}
                    </div>
                    <h1 className='italic text-2xl p-4 md:px-10'>Qualifications</h1>
                    {findJobById?.qualificationInput?.map((item: any, index: any) =>
                        <p key={index} className='italic text-lg p-2 md:px-10'>
                            <DoneIcon className='text-green-600 mr-2 ' /> {item}
                        </p>
                    )}

                    {/* Related Jobs Section */}
                    <h1 className='italic text-4xl md:mt-14 mt-4 md:px-10'>Related Jobs</h1>
                </div>
            </div>
        </>
    )
}

export default JobDetailsPage;