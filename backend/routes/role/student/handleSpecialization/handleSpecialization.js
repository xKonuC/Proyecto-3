import {
  express,
  studentHasSpecializationRoute,
  studentHasSemesterRoute,
  evaluationRoute,
  thesisRegistrationRoute,
} from './handleSpecialization.modules.js';

const handleSpecializationRoute = express.Router();
handleSpecializationRoute.use('/studentHasSpecialization', studentHasSpecializationRoute);
handleSpecializationRoute.use('/studentHasSemester', studentHasSemesterRoute);
handleSpecializationRoute.use('/evaluation', evaluationRoute);
handleSpecializationRoute.use('/thesisRegistration', thesisRegistrationRoute);
export default handleSpecializationRoute;
