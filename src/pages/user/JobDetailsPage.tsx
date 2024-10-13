import React, { useMemo, useState } from 'react'
import { JobCard } from '../../components/user/JobCard'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import DoneIcon from '@mui/icons-material/Done';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from '../../components/ui/alert-dialog'
import { ToastContainer, toast } from 'react-toastify';
import { applyJob } from '../../redux/action/jobAction'
import { IApplyJobPayload } from '../../types/jobTypes'

const JobDetailsPage = () => {
    const { id } = useParams()
    const { jobs } = useSelector((state: RootState) => state?.job)
    console.log(jobs)
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedResume, setSelectedResume] = useState<string | null>(null);

    const { user } = useSelector((state: RootState) => state?.user)

    const isLoggedIn = !!user?.data

    const findJobById = jobs?.jobsWithDetails?.find((job: any) => job?._id === id)
  console.log(findJobById)
    const handleResumeSelection = (resumeUrl: string) => {
        setSelectedResume(resumeUrl);
    };

    // const getCompanyDetails = (companyId: string) => {
    //     return state.datas.companyData.find(company => company._id === companyId);
    //   };
    // const relatedJobs = useMemo(() => {
    //     if (!findJobById?.skillInput || !state.datas?.jobData) return [];

    //     return state.datas.jobData.filter((job: any) =>
    //         job._id !== findJobById._id && 
    //         job.skillInput?.some((skill: string) => findJobById.skillInput.includes(skill)) 
    //     );
    // }, [findJobById, state.datas?.jobData]);

    // const handleJobClick = (jobId: string) => {
    //     navigate(`/jobDetails/${jobId}`);
    //   };


    const applyForJob = async () => {
        try {
            if (!isLoggedIn) {
                toast.info('Please log in to apply for this job.');
                navigate('login');
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
                if (result) {
                    toast.success('Application submitted successfully!')
                } else {
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
                    <div className="grid mt-10  ml-10  mb-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {/* {relatedJobs.slice(0, 3).map((data, index) => {
                            const companyDetails = getCompanyDetails(data.companyId);
                            return (
                                <div key={index} className="flex flex-col" >
                                    <div className="flex flex-col w-full  cursor-pointer" onClick={() => handleJobClick(data._id)}>
                                        <div className="flex grow gap-5 justify-center px-6 py-7 w-full rounded-lg border border-solid shadow-sm border-zinc-200 max-md:flex-wrap max-md:px-5 max-md:mt-6 max-md:max-w-full">
                                            <div className="flex flex-col grow shrink-0 basis-0 w-fit">
                                                <div className="text-lg font-medium leading-7 text-zinc-900">
                                                    {data?.jobTitle}
                                                </div>
                                                <div className="flex gap-2 mt-2.5">
                                                    <div className="justify-center px-2 py-1 text-xs font-semibold leading-3 text-green-600 uppercase whitespace-nowrap bg-green-100 rounded">
                                                        {data?.employmentType}
                                                    </div>
                                                    <div className="flex-auto my-auto text-sm leading-5 text-gray-500">
                                                        Salary: ₹{data?.salaryMin} - ₹{data?.salaryMax}
                                                    </div>
                                                </div>
                                                <div className="flex gap-3 mt-5">
                                                    <div className="flex flex-col justify-center items-start p-3 bg-gray-100 rounded max-md:pr-5">
                                                        {/* Display company image */}
                                                        {/* <img
                                                            loading="lazy"
                                                            src={companyDetails.icon}
                                                            alt={companyDetails.name}
                                                            className="w-8 aspect-square"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col self-start mt-1.5">
                                                        {/* Display company name */}
                                                        {/* <div className="text-base font-medium leading-6 text-zinc-900">
                                                            {companyDetails?.name}
                                                        </div>
                                                        <div className="flex gap-1 mt-2 text-sm leading-5 text-gray-500">
                                                            <img
                                                                loading="lazy"
                                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5752ef17b1e9e46a64fcc8e07a8b95e24827aeca8a9ba7194e220edbc0d45fb?"
                                                                className="shrink-0 aspect-square w-[18px]"
                                                            />
                                                            <div className="flex-auto">{data?.joblocation}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                {/* </div> */} 
                            {/* ); */}
                        {/* })} */} 
                    </div>
                </div>
            </div>
        </>
    )
}

export default JobDetailsPage;