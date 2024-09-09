// import { FaDove } from 'react-icons/fa'
import signUpimage from '../../assets/images/3e69ae84db376080609de0a95f97995d.jpg'
import logo from '../../assets/images/Group_1172__1_-removebg-preview.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { validationSchema } from '../../schemas/singupSchema'
import { Field, Formik, Form, ErrorMessage, FormikValues } from 'formik'
import { useDispatch } from 'react-redux'
import { googleSignup, signupUser } from '../../redux/action/userActions'
import { AppDispatch, } from '../../redux/store'
import OtpPage from './OtpPage'
import toast, { Toaster } from 'react-hot-toast'
import React from 'react'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode';





const SignUp = () => {
  const location = useLocation()
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const [passwordVisible, setpasswordVisible] = useState(false)
  const [confirmpasswordVisible, confirmsetpasswordVisible] = useState(false)
  const [otpPage, setOtpPage] = useState(false)
  const [userType, setUserType] = useState<string | undefined>(location.state?.userType || 'user');
  console.log(userType, 'typeof user')

  const [loading, setLoading] = useState(false)


  console.log(location.state, 'locaton')
  useEffect(() => {
    if (location.state?.userType) {
      setUserType(location.state.userType);
    }
  }, [location.state?.userType]);

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: userType
  }



  const signupWithGoogle = async (value: any, userType: string | undefined) => {

    try {
      const { data } = await dispatch(googleSignup({ ...value, userType })).unwrap()
      console.log(data,'data')
      setLoading(false);
     
      if (data) {
        if (data?.role === "user") {
          navigate('/');
          // toast.success('Signup successful');
        } else if (data?.role === 'company') {
          navigate('/company')

        } else {
          navigate('/admin')
        }
      }


    } catch (error: any) {
      setLoading(false)
      if (error) {
        toast.error(error?.message)
      } else {
        toast.error('error occured while signup')
      }
    }
  }

  const handleBackToSignup = () => {
    setOtpPage(false);
  }


  const togglePasswordVisibility = (fieldId: string) => {
    if (fieldId === "password") {
      setpasswordVisible(!passwordVisible);
    } else if (fieldId === "confirmPassword") {
      confirmsetpasswordVisible(!confirmpasswordVisible);
    }
  }

  const handleSubmit = async (values: FormikValues) => {
    setLoading(true);
    try {
      const data = await dispatch(signupUser(values)).unwrap();
      console.log('daat', data)
      setLoading(false);
      if (data) {
        setOtpPage(true);
        toast.success("OTP sent successfully");

      } else {
        toast.error("otp sent failed");
      }
    } catch (error: any) {
      setLoading(false);
      if (error) {
        toast.error(error?.message)
      } else {
        toast.error('error occured while signup')
      }
    }
  };




  return (

    <div className='h-1'>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <div className='grid grid-cols-1 md:grid-cols-2 h-screen'>
        <div className='relative'>
          <img src={signUpimage} className='h-screen md:h-screen w-screen object-cover' alt="Sign Up Background" />
          <img src={logo} className='absolute top-6 left-5 w-24 h-auto' alt="Logo" />
        </div>
        <div className='flex items-center justify-center font-sans '>
          {otpPage ? (<OtpPage onBackToSignup={handleBackToSignup} />) : (
            <div className='w-full max-w-md p-8 bg-white '>
              <h2 className='text-3xl font-bold font-gg  text-center mb-1'>User sign Up</h2>
              <p className='font-semibold'>if you already have an account </p>
              <span className='font-semibold'>you can </span><Link to='/login'><span className='font-semibold text-maincolr font-gg'>Login here !</span> </Link>
              <Formik initialValues={initialValues} validationSchema={validationSchema()} onSubmit={handleSubmit} >
                {({ isValid, dirty }) => (
                  <>
                    <Form className='space-y-2' >
                      <div>
                        <label htmlFor="email" className='block mt-2 mb-1 font-medium'>Email</label>
                        <Field type="email" name='email' id="email" className='w-full px-3 py-2 border rounded-md' placeholder='Enter your email' />
                        <ErrorMessage name='email' className='text-red-600 ' component='div' />
                      </div>
                      <div>
                        <label htmlFor="name" className='block mb-1 font-medium'> Username</label>
                        <Field type="text" name='name' id="name" className='w-full px-3 py-2 border rounded-md' placeholder='enter Username' />
                        <ErrorMessage name='name' className='text-red-600 ' component='div' />
                      </div>
                      <div>
                        <label htmlFor="password" className='block mb-1 font-medium'>Password</label>
                        <div className="relative">

                          <Field type={passwordVisible ? "text" : "password"} name='password' id="password" className='w-full px-3 py-2 border  rounded-md' placeholder='Create a password' />
                          <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => togglePasswordVisibility("password")}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400  md:-mt-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6a7.5 7.5 0 00-7.5 7.5M12 6a7.5 7.5 0 017.5 7.5" />
                            </svg>
                          </span>
                          <ErrorMessage name='password' className='text-red-600 ' component='div' />
                        </div>

                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className='block mb-1 font-medium '>Confirm Password</label>
                        <div className="relative">
                          <Field type={confirmpasswordVisible ? "text" : "password"} name='confirmPassword' id="confirmPassword" className='w-full px-3 py-2 border rounded-md' placeholder='Confirm your password' />
                          <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => togglePasswordVisibility("confirmPassword")}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:-mt-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6a7.5 7.5 0 00-7.5 7.5M12 6a7.5 7.5 0 017.5 7.5" />
                            </svg>
                          </span>

                          <ErrorMessage className='text-red-600 ' component="div" name='confirmPassword' />
                        </div>

                      </div>
                      <button type="submit" className={`w-full py-2 px-4 bg-maincolr mt-4 text-white rounded-3xl ${isValid && dirty ? 'bg-maincolr' : ' text-gray-500 cursor-pointer opacity-50'}`} disabled={!(isValid && dirty)}>
                        {loading ? (
                          <span className="loading loading-spinner loading-md"></span>
                        ) : (
                          'Register'
                        )}
                      </button>
                    </Form>
                    <div className='mt-4'>
                      <p className='text-center mb-2'>Or</p>
                      <div className='flex justify-center'>

                        <GoogleLogin
                          onSuccess={(credentialResponse: CredentialResponse) => {
                            if (credentialResponse?.credential) {
                              const data = jwtDecode(credentialResponse?.credential);
                              signupWithGoogle(data, userType);
                              console.log(data, 'google auth data');
                            } else {
                              console.log('No credential received');
                            }
                          }}
                          onError={() => {
                            console.log('login failed');
                          }}
                        >
                        </GoogleLogin>
                      </div>
                      {/* <button className='w-full mt-2 py-2 px-4 bg-white border border-gray-300 rounded-lg text-gray-700   flex items-center justify-center'>
                        <img src={googleicon} alt="Google" className='w-5 h-5 mr-2' />
                        Sign up with Google
                      </button> */}
                    </div>
                  </>
                )}
              </Formik>
            </div>
          )}
        </div>
      </div>
    </div>

  )
}

export default SignUp
