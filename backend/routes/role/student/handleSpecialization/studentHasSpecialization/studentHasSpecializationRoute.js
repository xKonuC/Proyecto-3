import {
  express,
  verifyPermissionWithExpiration,
  listSpecialization,
  listSemester,
  listSemesterAvailability,
  listStudentHasSpecialization,
  createStudentHasSpecialization,
  updateStudentHasSpecialization,
  cancellationVerification,
  validateStudentHasSpecializationID,
  validateSemesterID,
  validateSpecializationID,
} from './studentHasSpecialization.modules.js';

const studentHasSpecializationRoute = express.Router();
studentHasSpecializationRoute.get('/specialization', listSpecialization);
studentHasSpecializationRoute.get('/semester', listSemester);
studentHasSpecializationRoute.get('/semesterAvailability', listSemesterAvailability);
// Permiso llamado 'Permiso para Escoger Línea de Formación' tiene un permissionID de 1
studentHasSpecializationRoute.route('/')
  .get(listStudentHasSpecialization)
  .post(
    validateSemesterID,
    validateSpecializationID,
    verifyPermissionWithExpiration(1),
    cancellationVerification,
    createStudentHasSpecialization,
  )
  .put(
    validateStudentHasSpecializationID,
    validateSemesterID,
    validateSpecializationID,
    verifyPermissionWithExpiration(1),
    updateStudentHasSpecialization,
  );
export default studentHasSpecializationRoute;
