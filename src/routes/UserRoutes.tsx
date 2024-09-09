import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserPrivateRoute } from '../components/user/UserPrivateRoute';
import { UserProfileLayout } from '../layouts/UserProfileLayout';
import Dashboard from '@mui/icons-material/Dashboard';
import { Messages } from '../pages/user/Messages';


const UserRoutes: React.FC = () => (
  <Routes>
    <Route path='profile' element={<UserPrivateRoute><UserProfileLayout /></UserPrivateRoute>}>
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='messages' element={<Messages />} />
    </Route>
  </Routes>
);

export default UserRoutes;
