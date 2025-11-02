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
export default administratorRoute;
