import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray, FormikValues } from 'formik';
import { jobPostingValidationSchema } from '../../schemas/jobPostValidationSchema';
import { AichatSession } from '../../utils/services/aigemini';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { postJob } from '../../redux/action/jobAction';
import { useNavigate } from 'react-router-dom';

export const JobPost = () => {

    const [aiError, setAiError] = useState('');
    // const [loading, setLoading] = useState(false)
    const [genaiLoading, setgenaiLoading] = useState<boolean>(false)
    const dispatch: AppDispatch = useDispatch()
    // const state=useSelector((state:RootState)=>state.job)
    // console.log(state)
    // console.log(loading,err)
    const {user:{data}}=useSelector((state:RootState)=>state.user)
    console.log(data._id)
    const navigate=useNavigate()


    const initialValues = {
        jobTitle: '',
        employmentType: '',
        location: '',
        salaryMin: '',
        salaryMax: '',
        skillInput: [''],
        responsibilityInput: [''],
        qualificationInput: [''],
        endDate: '',
        jobDescription: '',
        experience: '',
        companyId:data?._id||''
    }

    const validateAiGeneration = (values: FormikValues) => {
        if (!values.jobTitle.trim() ||
            !values.experience.trim() ||
            values.skillInput.some((skill: string) => !skill.trim()) ||
            values.responsibilityInput.some((resp: string) => !resp.trim()) ||
            values.qualificationInput.some((qual: string) => !qual.trim())) {
            setAiError('Please fill out job title, skills, experience , responsibilities, and qualifications to generate AI description.');
            return false;
        }
        return true;
    };


    async function generateSummaryFromai(title: string, skills: string[], responsibility: string[], qualification: string[], experience: string, setFieldValue: (field: string, value: any) => void) {
        const prompt = `create a detailed job description for a ${title} position . The ideal candidate will possess the following skills: ${skills}. The responsibilities for this role include: ${responsibility} and the qualification for this role ${qualification} with minimum experience of ${experience} all these in to one paragraph `
        try {
            setAiError('')
            setgenaiLoading(true)
            const result = await AichatSession.sendMessage(prompt)
            const parsedResult = JSON.parse(result.response.text());
            setAiError('')
            if (parsedResult?.description) {
                setFieldValue('jobDescription', parsedResult.description);
            }
        } catch (error) {
            console.log(error)
            setAiError('Failed to generate AI description. Please try again.');
        } finally {
            setgenaiLoading(false)

        }
    }

    const handlesubmit = async (values: FormikValues) => {
      
        const data = await dispatch(postJob(values)).unwrap()
        if(data){
            navigate('/company/jobs')
        }else{
            console.log('failed to fetch data')
        }
       
        
    }


    return (
        <div className="w-full border rounded-lg p-6">
            <h2 className='text-center text-2xl font-bold mb-6 text-maincolr font-gg underline'>Post Job</h2>
            <hr className="border-t border-gray-300" />

            <Formik
                initialValues={initialValues}
                onSubmit={handlesubmit}
                validationSchema={jobPostingValidationSchema}
            >
                {({ isSubmitting, values, setFieldValue }) => (
                    <Form className="space-y-4 mt-4">
                        <div className='grid grid-cols-2 gap-4'>
                            <label htmlFor="jobTitle" className="text-lg pl-3 font-gg mb-4">Job Title</label>
                            <div>
                                <Field name="jobTitle" type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 " placeholder="Enter job title" />
                                <ErrorMessage name="jobTitle" component="div" className="text-red-600 text-sm" />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <label htmlFor="location" className="text-lg pl-3 font-gg mb-4">Location</label>
                            <div>
                                <Field name="location" type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 " placeholder="Enter job location" />
                                <ErrorMessage name="location" component="div" className="text-red-600 text-sm" />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <label htmlFor="employmentType" className="text-lg pl-3 font-gg mb-4">Type of Employment</label>
                            <div>
                                <Field as="select" name="employmentType" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 ">
                                    <option value="">Select</option>
                                    <option value="fulltime">Full Time</option>
                                    <option value="parttime">Part Time</option>
                                    <option value="remote">Remote</option>
                                    <option value="contract">Contract</option>
                                    <option value="intern">Intern</option>
                                </Field>
                                <ErrorMessage name="employmentType" component="div" className="text-red-600 text-sm" />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <label htmlFor="experience" className="text-lg pl-3 font-gg mb-4">Required Experience</label>
                            <div>
                                <Field name="experience" type="text" className="mt-1 block w-[70%] border border-gray-300 rounded-md shadow-sm py-2 px-3 " placeholder="Enter experience" />
                                <ErrorMessage name="experience" component="div" className="text-red-600 text-sm" />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <label htmlFor='salary' className="text-lg pl-3 font-gg mb-4">Salary Range</label>
                            <div className="flex space-x-4">
                                <Field name="salaryMin" type="number" className="w-1/2 border rounded px-2 py-1" placeholder="Min amount" />
                                <ErrorMessage name="salaryMin" component="div" className="text-red-600 text-sm" />
                                <Field name="salaryMax" type="number" className="w-1/2 border rounded px-2 py-1" placeholder="Max amount" />
                                <ErrorMessage name="salaryMax" component="div" className="text-red-600 text-sm" />

                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <label className="text-lg pl-3 font-gg mb-4">Required Skills</label>

                            <div>
                                <div className="flex space-x-2">
                                    <FieldArray name='skillInput'>
                                        {
                                            props => {
                                                const { push, remove, form } = props
                                                const { values } = form
                                                const { skillInput } = values

                                                return (<div>
                                                    {skillInput.map((_: any, index: any) => (
                                                        <div key={index}>
                                                            <Field className=' border rounded px-2 py-1' name={`skillInput[${index}]`} />
                                                            {index > 0 && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => remove(index)}
                                                                    className=" w-10 h-9   text-white rounded-md    bg-maincolr"                                                                >-

                                                                </button>
                                                            )}
                                                            <button
                                                                type="button"
                                                                onClick={() => push('')}
                                                                className=" w-10 h-9   text-white rounded-md    bg-maincolr"
                                                            >
                                                                +
                                                            </button>
                                                            <ErrorMessage name="skillInput" component="div" className="text-red-600 text-sm" />
                                                        </div>
                                                    ))}
                                                </div>)
                                            }
                                        }
                                    </FieldArray>
                                </div>
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <label className="text-lg pl-3 font-gg mb-4">Responsibilities</label>
                            <div>
                                <FieldArray name='responsibilityInput'>
                                    {
                                        props => {
                                            const { push, remove, form } = props
                                            const { values } = form
                                            const { responsibilityInput } = values

                                            return (<div>
                                                {responsibilityInput.map((_: any, index: any) => (
                                                    <div key={index}>
                                                        <Field className=' border rounded px-2 py-1 w-[70%]  ' name={`responsibilityInput[${index}]`} />

                                                        {index > 0 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => remove(index)}
                                                                className=" w-10 h-9   text-white rounded-md    bg-maincolr"                                                                >-

                                                            </button>
                                                        )}
                                                        <button
                                                            type="button"
                                                            onClick={() => push('')}
                                                            className=" w-10 h-9   text-white rounded-md    bg-maincolr"
                                                        >
                                                            +
                                                        </button>
                                                        <ErrorMessage name="responsibilityInput" component="div" className="text-red-600 text-sm" />

                                                    </div>
                                                ))}
                                            </div>)
                                        }
                                    }
                                </FieldArray>
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <label className="text-lg pl-3 font-gg mb-4">Preferred Qualifications</label>
                            <div>
                                <FieldArray name='qualificationInput'>
                                    {
                                        props => {
                                            const { push, remove, form } = props
                                            const { values } = form
                                            const { qualificationInput } = values

                                            return (<div>
                                                {qualificationInput.map((_: any, index: any) => (
                                                    <div key={index}>
                                                        <Field className=' border rounded px-2 py-1 w-[70%] ' name={`qualificationInput[${index}]`} />
                                                        {index > 0 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => remove(index)}
                                                                className=" w-10 h-9   text-white rounded-md    bg-maincolr"                                                                >-

                                                            </button>
                                                        )}
                                                        <button
                                                            type="button"
                                                            onClick={() => push('')}
                                                            className=" w-10 h-9   text-white rounded-md    bg-maincolr"
                                                        >
                                                            +
                                                        </button>
                                                        <ErrorMessage name="qualificationInput" component="div" className="text-red-600 text-sm" />

                                                    </div>
                                                ))}
                                            </div>)
                                        }
                                    }
                                </FieldArray>
                            </div>
                        </div>


                        <div className='grid grid-cols-2 gap-4'>
                            <label htmlFor="jobDescription" className="text-lg pl-3 font-gg mb-4">Job Description</label>
                            <div>
                                <Field
                                    as="textarea"
                                    name="jobDescription"
                                    className="w-full border rounded px-2 py-1"
                                    rows={4}
                                    placeholder="Enter job description or generate with AI"
                                />
                                <ErrorMessage name="jobDescription" component="div" className="text-red-600 text-sm" />
                                {aiError && <div className="text-red-600 text-sm">{aiError}</div>}
                                <button
                                    type="button"
                                    className="mt-2 bg-maincolr text-white p-2 rounded"
                                    onClick={() => {
                                        if (validateAiGeneration(values)) {
                                            generateSummaryFromai(
                                                values.jobTitle,
                                                values.skillInput,
                                                values.responsibilityInput,
                                                values.qualificationInput,
                                                values.experience,
                                                setFieldValue
                                            )
                                        }
                                    }}
                                >
                                    {genaiLoading ? (
                                        'generating...'

                                    ) : ' Generate AI Description'}

                                </button>
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <label htmlFor="endDate" className="text-lg pl-3 font-gg mb-4">Ends On</label>
                            <div>
                                <Field name="endDate" type="date" className="w-[40%] border rounded px-2 py-1" />
                                <ErrorMessage name="endDate" component="div" className="text-red-600 mt-1 text-sm" />
                            </div>
                        </div>

                        <div className='flex justify-end'>
                            <button type='submit' className='bg-maincolr font-gg text-white p-2 w-32 rounded' disabled={isSubmitting}>
                                {/* {loading?'posting...':'post Job'} */}
                                post job
                            </button>
                           {/* { err && <div className='text-red-600 mt-1 text-sm' >{err}</div>} */}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

