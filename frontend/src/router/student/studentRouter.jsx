import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomeStudent } from '../../pages/student/homeStudent';

import SidebarStudent from '../../components/sidebar/student/sidebarStudent';
import Profile from '../../pages/student/profile/profile';
import NotFound from '../../pages/notFound';

import SpecializationRouter from './specialization/specializationRouter';

const StudentRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<SidebarStudent />}>
        <Route index element={<HomeStudent />} />
        <Route path="Profile" element={<Profile />} />
      </Route>
      <Route path="Specialization/*" element={<SpecializationRouter />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default StudentRouter;
