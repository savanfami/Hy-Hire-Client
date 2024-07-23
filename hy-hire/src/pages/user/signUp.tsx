import { FaDove } from 'react-icons/fa'
import signUpimage from '../../assets/images/3e69ae84db376080609de0a95f97995d.jpg'
import logo from '../../assets/images/Group_1172__1_-removebg-preview.png'
import googleicon from '../../assets/images/icons8-google-144.png'
import { Link } from 'react-router-dom'
const SignUp = () => {
    return (
        <div className='h-1'>
<div className='grid grid-cols-1 md:grid-cols-2 h-screen'>
        <div className='relative'>
          <img src={signUpimage} className='h-screen w-screen object-cover' alt="Sign Up Background" />
          <img src={logo}  className='absolute top-6 left-5 w-24 h-auto' alt="Logo" />
        </div>
        <div className='flex items-center justify-center font-sans '>
          <div className='w-full max-w-md p-8 bg-white '>
            <h2 className='text-3xl font-bold font-gg mb-6 text-center'>Sign Up</h2>
            <p className='font-semibold'>if you already have an account </p>
            <span className='font-semibold'>you can </span><Link to='/login'><span className='font-semibold text-maincolr font-gg'>Login here !</span> </Link>
            <form className='space-y-4'>
              <div>
                <label htmlFor="email" className='block mt-10 mb-1 font-medium'>Email</label>
                <input type="email" id="email" className='w-full px-3 py-2 border rounded-md' placeholder='Enter your email' required />
              </div>
              <div>
                <label htmlFor="username" className='block mb-1 font-medium'>Username</label>
                <input type="text" id="username" className='w-full px-3 py-2 border rounded-md' placeholder='Choose a username' required />
              </div>
              <div>
                <label htmlFor="password" className='block mb-1 font-medium'>Password</label>
                <input type="password" id="password" className='w-full px-3 py-2 border rounded-md' placeholder='Create a password' required />
              </div>
              <div>
                <label htmlFor="confirmPassword" className='block mb-1 font-medium'>Confirm Password</label>
                <input type="password" id="confirmPassword" className='w-full px-3 py-2 border rounded-md' placeholder='Confirm your password' required />
              </div>
              <button type="submit" className='w-full py-2 px-4 bg-maincolr text-white rounded-3xl '>Register</button>
            </form>
            <div className='mt-4'>
              <p className='text-center'>Or</p>
              <button className='w-full mt-2 py-2 px-4 bg-white border border-gray-300 rounded-md text-gray-700   flex items-center justify-center'>
                <img src={googleicon}  alt="Google" className='w-5 h-5 mr-2' />
                Sign up with Google
              </button>
            </div>
          </div>
        </div>
      </div>
        </div>
        
    )
}

export default SignUp
