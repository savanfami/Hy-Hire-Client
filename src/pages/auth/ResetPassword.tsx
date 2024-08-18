import React, { useEffect, useState } from 'react'
import signIn from '../../assets/images/signin.jpg'
import logo from '../../assets/images/Group_1172__1_-removebg-preview.png'
import {  Link, Search, useLocation, useNavigate } from 'react-router-dom'
import { ErrorMessage, Field, Formik,Form, FormikValues } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { URL } from '../../common/axiosInstance'
import toast, { Toaster } from 'react-hot-toast'


interface resetPassword{
  password:string;
  confirmPassword:string
}

const initialValues:resetPassword={
    password:'',
    confirmPassword:''
}

const forgePasswordSchema=()=>
    yup.object().shape({
      password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&#]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    })


export const ResetPassword = () => {

    const [loading,setLoading]=useState(false)
    const [passwordVisible, setpasswordVisible] = useState(false)
    const [confirmpasswordVisible, confirmsetpasswordVisible] = useState(false)
    const [token,setToken]=useState('')

    const location=useLocation()
    const navigate=useNavigate()


    useEffect(()=>{
      console.log('use effect called')
        const params=new URLSearchParams(location.search)
        const token=params.get('token')
        if(token){
          setToken(token)
        }else{
          console.log('token is missing')
        }
    },[location.state])


    const togglePasswordVisibility = (fieldId: string) => {
      if (fieldId === "password") {
        setpasswordVisible(!passwordVisible);
      } else if (fieldId === "confirmPassword") {
        confirmsetpasswordVisible(!confirmpasswordVisible);
      }
    }
  

    const handleSubmit=async(values:FormikValues)=>{
      console.log(values)
        setLoading(true)

        try{
       
          const {data}=await axios.put(`${URL}/auth/resetPassword`,{
            values,
            token
          })
          setLoading(false)
          toast.success(data?.message)
          setTimeout(() => {
            navigate('/login')
          }, 2000)
        }catch(error:any){
          setLoading(false)
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
            <h1 className='font-bold font-gg text-2xl'>Reset Your Password </h1>
            <Formik initialValues={initialValues} validationSchema={forgePasswordSchema} onSubmit={handleSubmit} >
              {({ isValid, dirty }) => (
                <>
                  <Form className='space-y-1'>
                  <div>
                        <label htmlFor="password" className='block mb-1 mt-6 font-medium'>Password</label>
                        <div className="relative">

                          <Field type={passwordVisible ? "text" : "password"} name='password' id="password" className='w-full px-3 py-2 border  rounded-md' placeholder='Create a password' />
                          <span className="absolute inset-y-0 right-0 pr-3 flex items-center md:-mt-3 cursor-pointer" onClick={() => togglePasswordVisibility("password")}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400  " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6a7.5 7.5 0 00-7.5 7.5M12 6a7.5 7.5 0 017.5 7.5" />
                            </svg>
                          </span>
                          <div className='h-6'>
                          <ErrorMessage name='password' className='text-red-600 ' component='div' />

                          </div>
                        </div>

                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className='block mb-1 font-medium '>Confirm Password</label>
                        <div className="relative">
                          <Field type={confirmpasswordVisible ? "text" : "password"} name='confirmPassword' id="confirmPassword" className='w-full px-3 py-2 border rounded-md' placeholder='Confirm your password' />
                          <span className="absolute inset-y-0 right-0 pr-3 flex items-center md:-mt-3 cursor-pointer" onClick={() => togglePasswordVisibility("confirmPassword")}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6  text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6a7.5 7.5 0 00-7.5 7.5M12 6a7.5 7.5 0 017.5 7.5" />
                            </svg>
                          </span>

                          <div className='h-6'>
                          <ErrorMessage name='confirmPassword' className='text-red-600 ' component='div' />

                          </div>
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

