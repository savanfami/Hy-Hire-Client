import SignUp from './pages/auth/SignUp'
import { Homepage } from './components/user/HomePage'
import SignIn from './pages/auth/SignIn'
import RoutePage from './components/common/RoutePage'
import { Navigate, Route, Routes } from 'react-router-dom'
import UserLayout from './layouts/UserLayout'
import { UserPrivateRoute } from './components/user/UserPrivateRoute'
import { AdminPrivateRoute } from './components/admin/AdminPrivateRoute'
// import { CompanyPrivateRoute } from './components/user/UserPrivateRoute'
import { SingupCompany } from './pages/auth/SingupCompany'
import { ReqVerification } from './pages/auth/ReqVerification'
import AdminLayout from './layouts/AdminLayout'
import Request from './pages/admin/CompanyRequests'
import AdminDashboard from './pages/admin/AdminDashboard'
import { UserProfileLayout } from './layouts/UserProfileLayout'
import { Messages } from './pages/user/Messages'
import { Dashboard } from './pages/user/Dashboard'
import React from 'react'
// import UserListing from './pages/admin/UserListing''
import UserListing from './pages/admin/UserListing'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'

function App() {

  return (
    <Routes>
      {/* Public Routes */}
      <Route path='login' element={<SignIn />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='companysignup' element={<SingupCompany />} />
      <Route path='/reqaccept' element={<ReqVerification />} />
      <Route path='joinas' element={<RoutePage />} />
      <Route path='/' element={<UserLayout />} >
        <Route path='' element={<Homepage />} />
        {/* <Route path='/homepage' element={<Homepage />} /> */}
      </Route>


      {/* User Routes */}
      <Route path='profile' element={
        <UserPrivateRoute>
          <UserProfileLayout />
        </UserPrivateRoute>
      }>
        <Route path='' element={<Dashboard />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='messages' element={<Messages />} />
      </Route>



      {/* Admin Routes */}
      <Route>
        <Route path='admin' element={
          <AdminPrivateRoute>
            <AdminLayout />
          </AdminPrivateRoute>
        }>
          <Route path='' element={<AdminDashboard />} />
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='request' element={<Request />} />
          <Route path='company' element={<Request />} />
          <Route path='user' element={<UserListing />} />
        </Route>
      </Route>




      {/* Company Routes */}
      <Route>
        <Route path='company/home' />
      </Route>

    </Routes>




  )
}

export default App
