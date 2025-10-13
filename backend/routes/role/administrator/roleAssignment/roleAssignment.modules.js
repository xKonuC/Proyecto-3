/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
import express from 'express';
import userRoute from './user/userRoute.js';
import userHasRoleRoute from './userHasRole/userHasRoleRoute.js';
import importUsersRoute from './importUsers/importUsersRoute.js';
import userHasPermissionRoute from './userHasPermission/userHasPermissionRoute.js';

export {
  express,
  userRoute,
  userHasRoleRoute,
  importUsersRoute,
  userHasPermissionRoute,
};
