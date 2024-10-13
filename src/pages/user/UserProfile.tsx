import React, { useRef, useState } from 'react'
import { ProfilePicSection } from '../../components/user/ProfilePicSection'
import { ProfileSocialLinkSection } from '../../components/user/ProfileSocialLinkSection'
import ExperienceSection from '../../components/user/ProfileExperience'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { FaAward } from 'react-icons/fa'
import { Plus, Trash2 } from 'lucide-react'
import { formateDatetotwo } from '../../utils/common/formatDate'
import EditExperience from '../../components/user/EditExperience'
import { removeCertificateandUpdateProfile, removeEducationandUpdateProfile, removeExperienceandUpdateProfile, removeResumeandUpdateProfile, updateProfile } from '../../redux/action/userActions'
import AddEducation from '../../components/user/AddEducation'
import EditEducation from '../../components/user/EditEducation'
import { handleFileChange } from '../../utils/common/validatePdf'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from '../../components/ui/alert-dialog'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion"
import { uploadToCloudinary } from '../../utils/common/cloudinaryUpload'
import { CustomButton } from '../../components/common/Button'
import { AddSkills } from '../../components/user/AddSkills'
import { AddCertificates } from '../../components/user/AddCertificates'

export const UserProfile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user: { data } } = useSelector((state: RootState) => state?.user)
  const [pdf, setPdf] = useState<any>()
  const [pdfUrl, setPdfUrl] = useState<any>()
  const [modal, setModal] = useState<boolean>(false)
  const dispatch: AppDispatch = useDispatch()
  const removeExperience = async (index: number) => {
    try {
      await dispatch(removeExperienceandUpdateProfile(index)).unwrap()
    } catch (error: any) {
      console.log(error)
    }
  }


  const removeResume = async (index: number) => {
    try {
      await dispatch(removeResumeandUpdateProfile(index)).unwrap()
    } catch (error: any) {
      console.log(error)
    }
  }

  const removeEducation = async (index: number) => {
    try {
      await dispatch(removeEducationandUpdateProfile(index)).unwrap()
    } catch (error: any) {
      console.log(error)

    }
  }
  const removeCertificates = async (index: number) => {
    try {
      await dispatch(removeCertificateandUpdateProfile(index)).unwrap()
    } catch (error: any) {
      console.log(error)

    }
  }

  function handleClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      setModal(true)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let image = handleFileChange(e);
    if (image) {
      setPdfUrl(image)
      let url = URL.createObjectURL(image)
      console.log(url)
      setPdf(url)
    }
  }

  async function handleResume() {
    try {
      let image = await uploadToCloudinary(pdfUrl);
      const payload = {
        resumes: [
          ...data.resumes,
          image
        ]
      }
      console.log(payload);
      dispatch(updateProfile(payload)).unwrap();
      setModal(false)
    } catch (error) {
      setModal(false)
      console.log(error)
    }
  }




  return (
    <>
      <div className="grid grid-cols-1 border border-gray-200 rounded-md p-2   lg:grid-cols-12 gap-4">
        <div className="lg:col-span-9  ">
          <ProfilePicSection />
          <div>
            <h1 className='font-semibold text-lg ml-10 underline'>Experiences</h1>
            <div className='flex justify-end -mt-5'>
              <ExperienceSection />
            </div>

            {
              data?.experiences?.map((data: any, index: number) => (
                <div key={index} className="flex gap-5 px-6 py-6 max-md:flex-wrap max-md:px-5">
                  <FaAward className='md:mt-6' size={60} />
                  <div className="flex flex-col max-md:max-w-full w-full">
                    {/* Title and Edit/Delete Section */}
                    <div className="flex gap-1.5 justify-between w-full">
                      {/* Title */}
                      <div className="my-auto whitespace-nowrap text-lg font-semibold leading-7 text-slate-700 max-w-[300px] truncate">
                        {data.title}
                      </div>

                      {/* Edit/Delete Section */}
                      <div className="flex justify-center items-center gap-1 ">
                        <div className='px-2 border py-2 border-solid border-gray-400'>
                          <Trash2 className='text-maincolr' onClick={() => removeExperience(index)} />
                        </div>
                        <div className='px-2 py-2'>
                          <EditExperience ind={index} />
                        </div>
                      </div>
                    </div>

                    {/* Company and Date Section */}
                    <div className="flex justify-between mt-2 text-base leading-6 text-slate-600 w-full">
                      <div className="font-medium text-slate-700 max-w-[200px] truncate">
                        {data?.company}
                      </div>
                      <div className="whitespace-nowrap text-black ">
                        {
                          formateDatetotwo(data?.year?.from) + ' - ' +
                          (data?.year?.to ? formateDatetotwo(data?.year?.to) : 'Present')
                        }
                      </div>
                    </div>

                    {/* Description Section */}
                    <div className="mt-3 text-base leading-7 text-slate-600 w-full">
                      {data.description}
                    </div>
                  </div>
                </div>
              ))
            }

            <h1 className='font-semibold text-lg ml-10 underline mt-4'>Educations</h1>
            <div className='flex justify-end -mt-8'>
              <AddEducation />
            </div>
            {
              data?.education?.map((data: any, index: number) => (
                <div key={index} className="flex gap-5 px-6 py-6 max-md:flex-wrap max-md:px-5">
                  <img src="https://cdn-icons-png.flaticon.com/128/1940/1940611.png" className='w-16 h-20 mt-2' alt="school icon" />
                  <div className="flex flex-col max-md:max-w-full w-full">
                    {/* Title and Edit/Delete Section */}
                    <div className="flex gap-1.5 justify-between w-full">
                      {/* Title */}
                      <div className="my-auto whitespace-nowrap text-lg font-semibold leading-7 text-slate-700 max-w-[300px] truncate">
                        {data.course}
                      </div>

                      {/* Edit/Delete Section */}
                      <div className="flex justify-center items-center gap-1 ">
                        <div className='px-2 border py-2 border-solid border-gray-400'>
                          <Trash2 className='text-maincolr' onClick={() => removeEducation(index)} />
                        </div>
                        <div className='px-2 py-2'>
                          <EditEducation ind={index} />
                        </div>
                      </div>
                    </div>

                    {/* Company and Date Section */}
                    <div className="flex justify-between mt-2 text-base leading-6 text-slate-600 w-full">
                      <div className="font-medium text-slate-700 max-w-[200px] truncate">
                        {data?.university}
                      </div>
                      <div className="whitespace-nowrap text-black ">
                        {
                          formateDatetotwo(data?.year?.from) + ' - ' +
                          (data?.year?.to ? formateDatetotwo(data?.year?.to) : 'Present')
                        }
                      </div>
                    </div>

                    {/* Description Section */}
                    <div className="mt-3 text-base leading-7 text-slate-600 w-full">
                      {data.description}
                    </div>
                  </div>
                </div>
              ))
            }
            <div className="skills-list ml-10">
              <h3 className='font-semibold text-lg underline'>Your Skills</h3>
              {data?.skills && data.skills.length > 0 ? (
                <textarea
                  className="w-full p-2 border rounded"
                  value={data?.skills}
                  readOnly
                  rows={1}
                />
              ) : (
                <p>No skills found.</p>
              )}
            </div>
            <div className='flex justify-end'>
              <AddSkills />
            </div>
          </div>
          <div className="skills-list ml-10">
            <h3 className='font-semibold text-lg underline'>Certificates</h3>
            <div className='flex justify-end -mt-8  '>
              <AddCertificates />
            </div>
            {
              data?.certificates?.map((data: any, index: number) => (
                <div key={index} className="flex gap-5 px-6 py-6 max-md:flex-wrap max-md:px-5">
                  {data?.certificateImage ? (
                    <img src={data?.certificateImage} alt="image" className='h-28 w-28 rounded-md' />
                  ) : (
                    <FaAward className='md:mt-6' size={50} />
                  )}
                  <div className="flex flex-col max-md:max-w-full w-full">
                    {/* Title and Edit/Delete Section */}
                    <div className="flex gap-1.5 justify-between w-full">
                      {/* Title */}
                      <div className="flex items-center">
                        <label htmlFor="certificateName" className="mr-2">
                        Certificate Name :
                        </label>
                        <div className="text-base leading-6  font-medium text-slate-700 max-w-[200px] whitespace-nowrap">
                          {data?.certificateName}
                        </div>
                      </div>

                      <div className="flex justify-center items-center gap-1 ">
                        <div className='px-2 border py-2 border-solid border-gray-400'>
                          <Trash2 className='text-maincolr' onClick={() => removeCertificates(index)} />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <label htmlFor="certificateName" className="mr-2">
                        Issuing Organization:
                      </label>
                      <div className="text-base leading-6  font-medium text-slate-700 max-w-[200px] truncate">
                        {data?.issuingOrganization}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>

        </div>
        <div className='lg:col-span-3   '>
          <ProfileSocialLinkSection />
          <div style={{ border: '0.5px solid #dedbd3' }} className="flex flex-col p-6 w-full mt-6 bg-white rounded max-md:px-5">
            <div className="flex gap-4 justify-between">
              <div className="my-auto text-xl font-medium leading-6 text-slate-700 underline">
                Add resume
              </div>
              <div className="flex justify-center items-center p-2.5 border border-gray-500 rounded">

                <Plus onClick={handleClick} />
                <input ref={fileInputRef} onChange={handleChange} type='file' style={{ display: 'none' }} />
              </div>
            </div>
            <div className="flex gap-4 mt-4 text-base leading-6 whitespace-nowrap">
              <Accordion type="single" collapsible className="w-full">
                {
                  data?.resumes?.map((data: any, index: number) => (
                    <AccordionItem key={index} value={`item-${index + 1}`}>
                      <AccordionTrigger>resume {index + 1} </AccordionTrigger>
                      <AccordionContent>
                        <iframe height={400} src={data} className='w-full sm:w-auto'>
                        </iframe>
                        <Trash2 className='text-maincolr' onClick={() => removeResume(index)} />
                      </AccordionContent>
                    </AccordionItem>
                  ))
                }
              </Accordion>
            </div>
            {
              pdf && (
                <>
                  <AlertDialog open={modal}>
                    <AlertDialogTrigger asChild>
                    </AlertDialogTrigger >
                    <AlertDialogContent className='max-w-fit'>
                      <AlertDialogHeader>
                        <iframe width="320" className='w-fit' height="360"
                          // URL.createObjectURL(file)
                          src={pdf}
                        >

                        </iframe>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setModal(false)} className="">Cancel</AlertDialogCancel>
                        <CustomButton type="submit" onClick={handleResume} text='Submt' />
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog >

                </>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}



