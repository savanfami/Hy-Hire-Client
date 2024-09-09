import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminPrivateRoute } from '../components/admin/AdminPrivateRoute';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import Request from '../pages/admin/CompanyRequests';
import UserListing from '../pages/admin/UserListing';
import CompanyListing from '../pages/admin/CompanyListing';
import {CompanyDetails} from '../components/admin/CompanyDetails';

const AdminRoutes: React.FC = () => (
  <Routes>
    <Route path='admin' element={<AdminPrivateRoute><AdminLayout /></AdminPrivateRoute>}>
      <Route path='dashboard' element={<AdminDashboard />} />
      <Route path='request' element={<Request />} />
      <Route path='company' element={<CompanyListing />} />
      <Route path='user' element={<UserListing />} />
      <Route path='request/companyDetails' element={<CompanyDetails />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
