import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/user/Navbar'
import Footer from '../components/common/Footer'

export const LoggedinUserLayout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

 
