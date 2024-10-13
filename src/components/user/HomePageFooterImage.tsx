import React from 'react'
import workerimage from '../../assets/images/Banner.png'

export const HomePageFooterImage = () => {
  return (
    <>
      <div className='2xl:px-52  pb-10 px-10 sm:px-15 md:px-36 '>
        <img
          className='w-full '
          style={{ borderRadius: '1rem' }}
          src={workerimage}
          alt="worker image"
        />
      </div>
    </>
  )
}


