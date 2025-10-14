import express from 'express';
import getRoleHierarchy from './getRoleHierarchy.js';

const roleHierarchyRoute = express.Router();

roleHierarchyRoute.get('/', getRoleHierarchy);

export default roleHierarchyRoute;
