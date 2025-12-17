// ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getIsGraduateAccess } from '../../utils/cookieUtils';

const GraduateAccessProtectedRoute = ({ redirectPath = '/Graduate' }) => {
  if (!getIsGraduateAccess()) {
    return <Navigate to={redirectPath} replace/>;
  }

  return <Outlet />;
};

export default GraduateAccessProtectedRoute;
