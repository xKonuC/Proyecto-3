import {
  express,
  handleSpecializationRoute,
  listSemester,
  handleRubricRoute,
  handleAcademicRecordRoute,
  academicHasTitleRoute,
} from './academic.modules.js';

const academicRoute = express.Router();
academicRoute.use('/handleSpecialization', handleSpecializationRoute);
academicRoute.get('/semester', listSemester);
academicRoute.use('/handleRubric', handleRubricRoute);
academicRoute.use('/handleAcademicRecord', handleAcademicRecordRoute);
academicRoute.use('/academicHasTitle', academicHasTitleRoute);
export default academicRoute;
