import SignUp from './pages/user/SignUp'
import { Homepage } from './components/user/HomePage'
import SignIn from './pages/user/SignIn'
import RoutePage from './components/common/RoutePage'
import { Route, Routes, Navigate } from 'react-router-dom'
import UserLayout from './layouts/UserLayout'

function App() {
  return (
    <Routes>
      {/*User Routes */}
      <Route path='login' element={<SignIn />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='joinas' element={<RoutePage />} />
      <Route path='/' element={<UserLayout />} >
        <Route path='' element={<Homepage />} />
        {/* <Route path='job' element={<h1>jobs</h1>} /> */}
      </Route>

    </Routes>



  )
}

export default App
