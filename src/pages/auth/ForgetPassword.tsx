import React, { useEffect, useState } from 'react'
import signIn from '../../assets/images/signin.jpg'
import logo from '../../assets/images/Group_1172__1_-removebg-preview.png'
import { Link, useLocation } from 'react-router-dom'
import { ErrorMessage, Field, Formik, Form } from 'formik'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as yup from 'yup'
import axios from 'axios'
import { URL } from '../../common/axiosInstance'
import toast, { Toaster } from 'react-hot-toast'

type forgetPassword = {
    email: string
}

const initialValues: forgetPassword = {
    email: ''
}

const forgePasswordSchema = () =>
    yup.object().shape({
        email: yup
            .string()
            .matches(/^[A-Za-z0-9._%+-]+@gmail\.com$/, "Invalid email format")
            .email("Invalid email")
            .required("email is required"),
    })


export const ForgetPassword = () => {

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (values: forgetPassword) => {
        setLoading(true)
        try {
       
            const data = await axios.post(`${URL}/auth/forgotPassword`, { values })
            setLoading(false)
            toast.success(data.data.message)
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                const message = error.response.data.message;
                toast.error(message);
            } else {
                toast.error('An unexpected error occurred');
            }
        }

    }



    return (
        <>
            <div className='h-1'>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
                <div className='grid grid-cols-1 md:grid-cols-2 h-screen'>
                    <div className='relative'>
                        <img src={signIn} className='h-screen w-screen object-cover' alt="Sign Up Background" />
                        <Link to='/'><img src={logo} className='absolute top-6 left-5 w-24 h-auto' alt="Logo" /> </Link>
                    </div>
                    <div className='flex items-center justify-center font-sans '>
                        <div className='w-full max-w-md p-8 bg-white '>
                         <Link to='/login'>  <p className='text-md font-gg mb-6 text-start'>
                                <ArrowBackIcon />
                                Back to Login</p></Link> 
                            <h1 className='font-bold font-gg text-2xl'>Forgot Your Password ?</h1>
                            <p className='mt-4 font-gg font-normal'>Don't worry it happen to all of us.Enter your email below to recover your password </p>
                            <Formik initialValues={initialValues} validationSchema={forgePasswordSchema} onSubmit={handleSubmit} >
                                {({ isValid, dirty }) => (
                                    <>
                                        <Form className='space-y-1'>
                                            <div>
                                                <label htmlFor="email" className='block mt-8 mb-1 font-medium'>Email</label>
                                                <Field type="email" id="email" name='email' className='w-full px-3 py-2 border rounded-md' placeholder='Enter your email' />
                                                <div className=' h-6'>

                                                    <ErrorMessage name='email' className='text-red-600 ' component='div' />
                                                </div>

                                            </div>

                                            <div>

                                                <button type="submit" className={`w-full py-2 px-4 bg-maincolr mt-4 text-white rounded-3xl ${isValid && dirty ? 'bg-maincolr' : ' text-gray-500 cursor-pointer opacity-50'}`} disabled={!(isValid && dirty)}>
                                                    {loading ? (
                                                        <span className="loading loading-spinner loading-md"></span>
                                                    ) : (
                                                        'Submit'
                                                    )}
                                                </button>
                                            </div>
                                        </Form>

                                    </>
                                )}
                            </Formik>
                            <div className='mt-4'>
                                {/* <p className='text-center'>Or</p> */}
                                {/* <button className='w-full mt-2 py-2 px-4 bg-white border border-gray-300 rounded-md text-gray-700   flex items-center justify-center'>
                <img src={googleicon} alt="Google" className='w-5 h-5 mr-2' />
                Continue with Google
              </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ) */}
        </>
    )
}

