import SignUp from './pages/auth/SignUp'
import { Homepage } from './components/user/HomePage'
import SignIn from './pages/auth/SignIn'
import RoutePage from './components/common/RoutePage'
import { Route, Routes } from 'react-router-dom'
import UserLayout from './layouts/UserLayout'
import CompanyDashboard from './pages/company/Dashboard'
import { UserPrivateRoute } from './components/user/UserPrivateRoute'
import { AdminPrivateRoute } from './components/admin/AdminPrivateRoute'
import { SingupCompany } from './pages/auth/SingupCompany'
import { ReqVerification } from './pages/auth/ReqVerification'
import AdminLayout from './layouts/AdminLayout'
import Request from './pages/admin/CompanyRequests'
import AdminDashboard from './pages/admin/AdminDashboard'
import { UserProfileLayout } from './layouts/UserProfileLayout'
import { Messages } from './pages/user/Messages'
import { Dashboard } from './pages/user/Dashboard'
import React from 'react'
import UserListing from './pages/admin/UserListing'
import { ForgetPassword } from './pages/auth/ForgetPassword'
import { ResetPassword } from './pages/auth/ResetPassword'
import { CompanyLayout } from './layouts/CompanyLayout'
import { CompanyPrivateRoute } from './components/company/CompanyPrivateRoute'
import { Settings } from './pages/company/Settings'
import { CompanyDetails } from './components/admin/CompanyDetails'
import { JobPost } from './pages/company/JobPost'
import CompanyListing from './pages/admin/CompanyListing'
import { JobList } from './pages/company/jobList'
import { ErrorBoundary } from './components/common/ErrroBoundary'
import { CompanyDetail } from './pages/user/CompanyDetails'
import { UserSideJobListing } from './pages/user/UserSideJobListing'
import JobDetailsPage from './pages/user/JobDetailsPage'
import { UserProfile } from './pages/user/UserProfile'
function App() {





  return (
    <ErrorBoundary>


      <Routes>
        {/* Public Routes */}
        <Route path='login' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='companysignup' element={<SingupCompany />} />
        <Route path='reqaccept' element={<ReqVerification />} />
        <Route path='joinas' element={<RoutePage />} />
        <Route path='forgetPassword' element={<ForgetPassword />} />
        <Route path='resetPassword' element={<ResetPassword />} />

        <Route path='/' element={<UserLayout />} >
          <Route path='' element={<Homepage />} />
          <Route path='companydetails' element={<CompanyDetail/>}/>
          <Route path='joblisting' element={<UserSideJobListing/>}/>
          <Route path='/jobdetails/:id' element={<JobDetailsPage/>}/>
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
          <Route path='profile' element={<UserProfile/>}/>
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
            <Route path='company' element={<CompanyListing />} />
            <Route path='user' element={<UserListing />} />
            <Route path='request/companyDetails' element={<CompanyDetails />} />

          </Route>
        </Route>




        {/* Company Routes */}
        <Route>
          <Route path='company' element={
            <CompanyPrivateRoute>
              <CompanyLayout />
            </CompanyPrivateRoute>
          }>
            <Route index element={<CompanyDashboard />} />
            <Route path='dashboard' element={<CompanyDashboard />} />
            <Route path='settings' element={<Settings />} />
            <Route path='jobpost' element={<JobPost />} />
            <Route path='jobs' element={<JobList />} />


          </Route>
        </Route>


 
      </Routes>


    </ErrorBoundary>

  )
}

export default App
