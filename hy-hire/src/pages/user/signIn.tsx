import React from 'react'
import signIn from '../../assets/images/signin.jpg'
    import logo from '../../assets/images/Group_1172__1_-removebg-preview.png'
import googleicon from '../../assets/images/icons8-google-144.png'


const SignIn = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 h-screen'>
    <div className='relative'>
      <img src={signIn} className='h-screen w-screen object-cover' alt="Sign Up Background" />
      <img src={logo}  className='absolute top-6 left-5 w-24 h-auto' alt="Logo" />
    </div>
    <div className='flex items-center justify-center font-sans '>
      <div className='w-full max-w-md p-8 bg-white '>
        <h2 className='text-3xl font-bold font-gg mb-6 text-center'>Welcome Back !!!</h2>
        <p className='font-semibold'>if you dont't have an account </p>
        <span className='font-semibold'>you can </span> <span className='font-semibold text-maincolr font-gg'>Register here !</span>
        <form className='space-y-4'>
          <div>
            <label htmlFor="email" className='block mt-10 mb-1 font-medium'>Email</label>
            <input type="email" id="email" className='w-full px-3 py-2 border rounded-md' placeholder='Enter your email' required />
          </div>
         
          <div>
            <label htmlFor="password" className='block mb-1 font-medium'>Password</label>
            <input type="password" id="password" className='w-full px-3 py-2 mb-2 border rounded-md' placeholder='Enter your  password' required />
           
            <span className='text-gray-500 2xl:ml-64 '>Forgot Password?</span>

          </div>
         
          <button type="submit" className='w-full py-2 px-4 bg-maincolr text-white rounded-3xl '>Login</button>
        </form>
        <div className='mt-4'>
          <p className='text-center'>Or</p>
          <button className='w-full mt-2 py-2 px-4 bg-white border border-gray-300 rounded-md text-gray-700   flex items-center justify-center'>
            <img src={googleicon}  alt="Google" className='w-5 h-5 mr-2' />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SignIn
