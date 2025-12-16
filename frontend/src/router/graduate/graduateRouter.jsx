import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomeGraduate } from '../../pages/graduate/homeGraduate';

import SidebarGraduate from '../../components/sidebar/graduate/sidebarGraduate.jsx';
import Profile from '../../pages/graduate/profile/profile';
import NotFound from '../../pages/notFound';

const GraduateRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<SidebarGraduate />}>
        <Route index element={<HomeGraduate />} />
        <Route path="Profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default GraduateRouter;
