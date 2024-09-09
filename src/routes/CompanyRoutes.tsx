import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CompanyPrivateRoute } from '../components/company/CompanyPrivateRoute';
import {CompanyLayout} from '../layouts/CompanyLayout';
import CompanyDashboard from '../pages/company/Dashboard';
import {Settings} from '../pages/company/Settings';
import {JobPost} from '../pages/company/JobPost';
import {JobList} from '../pages/company/jobList';

const CompanyRoutes: React.FC = () => (
  <Routes>
    <Route path='company' element={<CompanyPrivateRoute><CompanyLayout /></CompanyPrivateRoute>}>
      <Route index element={<CompanyDashboard />} />
      <Route path='dashboard' element={<CompanyDashboard />} />
      <Route path='settings' element={<Settings />} />
      <Route path='jobpost' element={<JobPost />} />
      <Route path='jobs' element={<JobList />} />
    </Route>
  </Routes>
);

export default CompanyRoutes;
