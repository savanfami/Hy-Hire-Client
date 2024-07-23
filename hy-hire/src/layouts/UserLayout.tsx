import React from 'react'
import Navbar from '../components/common/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/common/Footer'

function UserLayout() {
    return (
        <>
            <div className="overflow-x-hidden">
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </>
    )
}

export default UserLayout
