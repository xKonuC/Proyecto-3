import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import SidebarGraduate from '../../components/sidebar/graduate/sidebarGraduate.jsx';
import Profile from '../../pages/graduate/profile/profile';
import UpdateGraduateData from '../../pages/graduate/updateGraduateData';
import NotFound from '../../pages/notFound';

const GraduateRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<SidebarGraduate />}>
        <Route index element={<Navigate to="Profile" replace />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="UpdateData" element={<UpdateGraduateData />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default GraduateRouter;
