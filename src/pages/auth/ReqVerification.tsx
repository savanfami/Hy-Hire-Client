import React from 'react'
import { FaRegThumbsUp } from "react-icons/fa6";

export const ReqVerification = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="text-center max-w-full">
        <FaRegThumbsUp className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px] bg-gray-100 text-blue-900 rounded-3xl p-3 mx-auto" />
        <h1 className="font-ff font-bold text-3xl sm:text-4xl md:text-5xl mt-6 md:mt-8">We Have Received Your Request!</h1>
        <h2 className='text-xl sm:text-2xl font-semibold mt-4'>Thank you for signing up to <span className='font-bold'>Hy-Hire</span>   !!</h2>
        <h2 className='text-lg sm:text-xl md:text-2xl font-semibold mt-4'>
          We will inform you about your request via email when verification is  
          <span className='font-bold block mt-2'> done within the next 1 to 3 business days</span>
        </h2>
        <h2 className='text-lg sm:text-xl md:text-2xl font-semibold mt-4'>
          Until then do not hesitate to reach out to us at "hyhire004@gmail.com" 
        </h2>
      </div>
    </div>
  )
}