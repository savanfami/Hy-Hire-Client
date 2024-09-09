import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';

import RoutePage from '../components/common/RoutePage';
import { SingupCompany } from '../pages/auth/SingupCompany';
import { ReqVerification } from '../pages/auth/ReqVerification';
import { ForgetPassword } from '../pages/auth/ForgetPassword';
import { ResetPassword } from '../pages/auth/ResetPassword';
import UserLayout from '../layouts/UserLayout';
import { Homepage } from '../components/user/HomePage';

export const PublicRoutes: React.FC = () => (
  <Routes>
    <Route path='login' element={<SignIn />} />
    <Route path='signup' element={<SignUp />} />
    <Route path='companysignup' element={<SingupCompany />} />
    <Route path='reqaccept' element={<ReqVerification />} />
    <Route path='joinas' element={<RoutePage />} />
    <Route path='forgetPassword' element={<ForgetPassword />} />
    <Route path='resetPassword' element={<ResetPassword />} />
     
    <Route path='/' element={<UserLayout />} >
        <Route path='' element={<Homepage />} />
       
      </Route>

  </Routes>
);

