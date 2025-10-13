// ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getSession } from '../../utils/sessionHelpers';

const AuthProtectedRoute = ({ redirectPath = '/' }) => {
  if (!getSession()) {
    return <Navigate to={redirectPath} replace/>;
  }

  return <Outlet />;
};

export default AuthProtectedRoute;
