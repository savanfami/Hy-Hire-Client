import signIn from '../../assets/images/signin.jpg'
import logo from '../../assets/images/Group_1172__1_-removebg-preview.png'
import googleicon from '../../assets/images/icons8-google-144.png'
import { Link } from 'react-router-dom'
import { Field, Formik, Form, ErrorMessage } from 'formik'
import { loginSchema } from '../../schemas/loginSchema'
import { googleSignup, login } from '../../redux/action/userActions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../redux/store'
import { loginPayload } from '../../types/Alltypes'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import React from 'react'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

const SignIn = () => {
  const [passwordVisible, setpasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const userType = 'default'


  const passwordVisibiltiy = (field: string) => {
    if (field === 'password') {
      setpasswordVisible(!passwordVisible)
    }
  }

  const initialValues: loginPayload = {
    email: '',
    password: ''
  }

  const navigate = useNavigate()


  const signInWithGoogle = async (value: any, userType: string | undefined) => {
    try {
      const { data } = await dispatch(googleSignup({ ...value, userType })).unwrap()
      console.log(data, 'daatata')
      setLoading(false);
      console.log('daat', data)
      if (data) {
        if (data?.role === "user") {
          navigate('/');
          // toast.success('Signup successful');
        } else if (data?.role === 'company') {
          navigate('/reqaccept')

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


  const dispatch = useDispatch<AppDispatch>()
  const handleSubmit = async (values: loginPayload) => {
    setLoading(true)
    try {
      const { data } = await dispatch(login(values)).unwrap();
      console.log(data, 'data')
      setLoading(false)
      if (data) {
        if (data?.role === "user") {
          navigate('/', { replace: true });
          // toast.success('Signup successful');
        } else if (data?.role === 'company') {
          navigate('/reqaccept')

        } else {
          navigate('/admin')
        }
      } else {
        toast.error('login failed')
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



  return (
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
            <h2 className='text-3xl font-bold font-gg mb-6 text-center'>Welcome Back !!!</h2>
            <p className='font-semibold'>if you dont't have an account </p>
            <span className='font-semibold'>you can </span> <Link to='/joinas'>  <span className='font-semibold text-maincolr font-gg'>Register here !</span></Link>
            <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={handleSubmit} >
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
                      <label htmlFor="password" className='block mb-1  font-medium'>Password</label>
                      <Field type={passwordVisible ? 'text' : 'password'} id="password" name='password' className='w-full px-3 py-2 mb-2 border rounded-md' placeholder='Enter your  password' />
                      <span className="absolute inset-y-0 xl:mr-[300px] right-0 md:mr-52 mt-toggleheight mr-togglewidth  md:mt-20 flex items-center cursor-pointer" onClick={() => passwordVisibiltiy("password")}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:-mt-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6a7.5 7.5 0 00-7.5 7.5M12 6a7.5 7.5 0 017.5 7.5" />
                        </svg>
                      </span>
                      <div className='h-6 '>

                        <ErrorMessage name='password' className='text-red-600  ' component='div' />
                      </div>

                      <div >

                        <Link to='/forgetPassword'>  <span className='text-black  2xl:ml-64 cursor-pointer'>Forgot Password?</span></Link>
                      </div>


                    </div>
                    <div>

                      <button type="submit" className={`w-full py-2 px-4 bg-maincolr mt-4 text-white rounded-3xl ${isValid && dirty ? 'bg-maincolr' : ' text-gray-500 cursor-pointer opacity-50'}`} disabled={!(isValid && dirty)}>
                        {loading ? (
                          <span className="loading loading-spinner loading-md"></span>
                        ) : (
                          'Login'
                        )}
                      </button>
                    </div>
                  </Form>

                </>
              )}
            </Formik>
            <div className='mt-4'>
              <p className='text-center mb-2'>Or</p>
              <div className='flex justify-center'>

                <GoogleLogin
                  onSuccess={(credentialResponse: CredentialResponse) => {
                    if (credentialResponse?.credential) {
                      const data = jwtDecode(credentialResponse?.credential);
                      signInWithGoogle(data, userType);
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn


