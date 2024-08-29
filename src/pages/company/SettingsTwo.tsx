import React from 'react'
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage, FormikValues, } from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { updateSocialLinks } from '../../redux/action/companyAction';
import { SocialLinks } from '../../types/Alltypes';
import toast, { Toaster } from 'react-hot-toast';



const valdationSchema = () =>
  yup.object().shape({
    instagram: yup
      .string()
      .matches(
        /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9._-]+\/?$/,
        'Invalid Instagram URL'
      ),
    facebook: yup
      .string()
      .matches(
        /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9._-]+\/?$/,
        'Invalid Facebook URL'
      ),
    twitter: yup
      .string()
      .matches(
        /^(https?:\/\/)?(www\.)?twitter\.com\/[a-zA-Z0-9._-]+\/?$/,
        'Invalid Twitter URL'
      ),
    linkedin: yup
      .string()
      .matches(
        /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9._-]+\/?$/,
        'Invalid LinkedIn URL'
      )
  })


export const SettingsTwo = () => {
  const dispatch: AppDispatch = useDispatch()
  const { user: { data } } = useSelector((state: RootState) => state.user)

  const initialValues = {
    instagram: data.socialLinks.instagram || '',
    facebook: data.socialLinks.facebook || '',
    twitter: data.socialLinks.twitter || '',
    linkedin: data.socialLinks.linkedIn || '',
  }



  const handleSubmit = async (values: SocialLinks) => {
    try {
      const data = await dispatch(updateSocialLinks(values)).unwrap()
      console.log(data, 'data from')
      if (data) {
        toast.success(data?.message as string)
      } else {
        toast.error('some error occured')
      }
    } catch (error) {
      console.error('Error updating social links:', error);
    
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error('An unexpected error occurred');
      }

  }
}
  return (
    <Formik initialValues={initialValues} validationSchema={valdationSchema} onSubmit={handleSubmit} >
      {({
        isSubmitting }) => (
        <Form>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
          <div className='h-20 flex-col items-center pl-5'>
            <h1 className='text-xl font-gg mt-3'>Add Social Links</h1>
            <h5 className='text-sm mt-3 text-gray-400'>This is the information you can update anytime.</h5>
          </div>
          <hr className="border-t border-gray-300" />
          <div className='w-[70%] pl-3 flex items-center h-20 gap-10 '>
            <label htmlFor='instagram' className='block text-sm font-medium text-gray-700'>Instagram</label>
            <Field type='text' id='instagram' name='instagram' className='mt-1 w-[50%] block  border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-maincolr focus:border-maincolr' />
            <div className=' h-6'>
              <ErrorMessage name='instagram' className='text-red-600 ' component='div' />
            </div>
          </div>
          <div className='w-[70%] h-20 pl-3 flex items-center  gap-10 '>
            <label htmlFor='facebook' className='block text-sm font-medium text-gray-700'>Facebook</label>
            <Field type='text' id='facebook' name='facebook' className='mt-1 w-[50%] block  border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-maincolr focus:border-maincolr' />
            <div className=' h-6'>

              <ErrorMessage name='facebook' className='text-red-600 ' component='div' />
            </div>
          </div>
          <div className='w-[70%] pl-7 h-20 flex items-center  gap-10 '>
            <label htmlFor='twitter' className='block text-sm font-medium text-gray-700'>Twitter</label>
            <Field type='text' id='twitter' name='twitter' className='mt-1 block w-[50%] border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-maincolr focus:border-maincolr' />
            <div className=' h-6'>

              <ErrorMessage name='twitter' className='text-red-600 ' component='div' />
            </div>
          </div>
          <div className='w-[70%] h-20 pl-3 flex items-center  gap-10 '>
            <label htmlFor='linkedin' className='block text-sm font-medium text-gray-700'>LinkedIn</label>
            <Field type='text' id='linkedin' name='linkedin' className='mt-1 block w-[50%] border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-maincolr focus:border-maincolr' />
            <div className=' h-6'>

              <ErrorMessage name='linkedin' className='text-red-600 ' component='div' />
            </div>
          </div>
          <div className='flex justify-start p-3 pl-3 mt-2'>

            <button type='submit' className='bg-maincolr rounded-md text-white p-2' disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </Form>
      )}
    </Formik >
  )
}

