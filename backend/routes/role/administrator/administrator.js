import {
  express,
  roleAssignmentRoute,
  handleSpecializationRoute,
  handleRubricRoute,
  documentRoute,
  handleTitleRoute,
  semesterRoute,
  handleAcademicRecordRoute,
  thesisRegistrationRoute,
  graduateRoute,
  userPermissionsRoute,
  roleHierarchyRoute,
} from './administrator.modules.js';

const administratorRoute = express.Router();
administratorRoute.use('/roleAssignment', roleAssignmentRoute);
administratorRoute.use('/handleSpecialization', handleSpecializationRoute);
administratorRoute.use('/handleRubric', handleRubricRoute);
administratorRoute.use('/document', documentRoute);
administratorRoute.use('/handleTitle', handleTitleRoute);
administratorRoute.use('/semester', semesterRoute);
administratorRoute.use('/handleAcademicRecord', handleAcademicRecordRoute);
administratorRoute.use('/thesisRegistration', thesisRegistrationRoute);
administratorRoute.use('/graduate', graduateRoute);
administratorRoute.use('/userPermissions', userPermissionsRoute);
administratorRoute.use('/roleHierarchy', roleHierarchyRoute);
export default administratorRoute;
