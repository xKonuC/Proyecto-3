// ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getIsAdminAccess } from '../../utils/cookieUtils';

const AdminAccessProtectedRoute = ({ redirectPath = '/Dashboard' }) => {
  if (!getIsAdminAccess()) {
    return <Navigate to={redirectPath} replace/>;
  }

  return <Outlet />;
};

export default AdminAccessProtectedRoute;
