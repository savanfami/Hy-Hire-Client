import SignUp from './pages/auth/SignUp'
import { Homepage } from './components/user/HomePage'
import SignIn from './pages/auth/SignIn'
import RoutePage from './components/common/RoutePage'
import { Route, Routes } from 'react-router-dom'
import UserLayout from './layouts/UserLayout'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './redux/store'
import { getUserData } from './redux/action/userActions'
import { SingupCompany } from './pages/auth/SingupCompany'
import { ReqVerification } from './pages/auth/ReqVerification'
// import Home from './pages/admin/Home'
import AdminLayout from './layouts/AdminLayout'
import Request from './pages/admin/CompanyRequests'
import AdminDashboard from './pages/admin/AdminDashboard'
import { UserProfileLayout } from './layouts/UserProfileLayout'
import { Messages } from './pages/user/Messages'
import { Dashboard } from './pages/user/Dashboard'

function App() {

  // const dispatch: AppDispatch = useDispatch()
  // const { user } = useSelector((state: RootState) => state.user)
  // console.log(user)

  // useEffect(()=>{
  //   console.log('saddjfdf')
  //   if(!user){
  //     console.log('indofr user')
  //     dispatch(getUserData()).then(()=>console.log('user data fetched successfully'))

  //   }
  // },[])

  return (
    <Routes>
      {/*User Routes */}
      <Route path='login' element={<SignIn />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='companysignup' element={<SingupCompany />} />
      <Route path='/reqaccept' element={<ReqVerification />} />
      <Route path='joinas' element={<RoutePage />} />
      <Route path='/' element={<UserLayout />} >
        <Route path='' element={<Homepage />} />
        <Route path='/homepage' element={<Homepage />} />

        {/* <Route path='job' element={<h1>jobs</h1>} /> */}
      </Route>
      <Route path='/dashboard' element={<UserProfileLayout/>}/>
      <Route path='' element={<Dashboard/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/messages' element={<Messages/>}/>

      

      {/* Admin Routes */}
      <Route>
        <Route path='admin' element={<AdminLayout />}>
          <Route path='' element={<AdminDashboard />} />
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='request' element={<Request />} />
          <Route path='company' element={<Request />} />
        </Route>
      </Route>




      {/* Company Routes */}
      <Route>
        <Route path='admin/home' />
      </Route>

    </Routes>




  )
}

export default App
