import SignUp from './pages/auth/SignUp'
import { Homepage } from './components/user/HomePage'
import SignIn from './pages/auth/SignIn'
import RoutePage from './components/common/RoutePage'
import { Route, Routes } from 'react-router-dom'
import UserLayout from './layouts/UserLayout'
import CompanyDashboard from './pages/company/Dashboard'
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
import React, { useEffect } from 'react'
// import UserListing from './pages/admin/UserListing''
import UserListing from './pages/admin/UserListing'
import { ForgetPassword } from './pages/auth/ForgetPassword'
import { ResetPassword } from './pages/auth/ResetPassword'
import { CompanyLayout } from './layouts/CompanyLayout'
import { CompanyPrivateRoute } from './components/company/CompanyPrivateRoute'
import { Settings } from './pages/company/Settings'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './redux/store'
import { getCompany } from './redux/action/companyAction'
// import { SettingsOne } from './pages/company/SettingsOne'

function App() {


  // const { user } = useSelector((state: RootState) => state.user)

  // const dispatch: AppDispatch = useDispatch()


  // const fetchData = async () => {
  //   try {
  //     await dispatch(getCompany()).unwrap()
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // if (user!==null) {
  //   console.log('indide')
  //   if(user.data.role==='company'){
  //     useEffect(() => {
  //       console.log('use effect called')
  //       fetchData()
  //     }, [user.data.role])

  //   }

  // }


  return (
    <Routes>
      {/* Public Routes */}
      <Route path='login' element={<SignIn />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='companysignup' element={<SingupCompany />} />
      <Route path='reqaccept' element={<ReqVerification />} />
      <Route path='joinas' element={<RoutePage />} />
      <Route path='forgetPassword' element={<ForgetPassword />} />
      <Route path='resetPassword' element={<ResetPassword />} />
      {/* <Route path='companyLayout' element={<CompanyLayout />} /> */}

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
        <Route path='company' element={
          <CompanyPrivateRoute>
            <CompanyLayout />
          </CompanyPrivateRoute>
        }>
          <Route index element={<CompanyDashboard />} />
          <Route path='dashboard' element={<CompanyDashboard />} />
          <Route path='settings' element={<Settings />} />


        </Route>
      </Route>



    </Routes>




  )
}

export default App
