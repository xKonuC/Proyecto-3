import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomeAdministrative } from '../../pages/administrative/homeAdministrative';

import Profile from '../../pages/administrative/profile/profile';
import SidebarAdministrative from '../../components/sidebar/administrative/sidebarAdministrative';
import NotFound from '../../pages/notFound';

import AdministratorRouter from './administrator/administratorRouter';
import AcademicRouter from './academic/academicRouter';
import GraduateRouter from './graduate/graduateRouter';


const AdministrativeRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<SidebarAdministrative />}>
        <Route index element={<HomeAdministrative />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="Administrator/*" element={<AdministratorRouter />} />
        <Route path="Academic/*" element={<AcademicRouter />} />
        <Route path="Graduate/*" element={<GraduateRouter />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdministrativeRouter;
