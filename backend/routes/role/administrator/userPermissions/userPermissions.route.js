import express from 'express';
import getUserPermissions from './getUserPermissions.js';

const userPermissionsRoute = express.Router();

userPermissionsRoute.get('/', getUserPermissions);

export default userPermissionsRoute;
