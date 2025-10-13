import {
  express,
  verifyPermissionWithExpiration,
  listEvaluationType,
  listStudentHasSemester,
  createStudentHasSemester,
  updateStudentHasSemester,
  verificationApproval,
  listStudentHasElective,
  createStudentHasElective,
  updateStudentHasElective,
  verifyElective,
  validateStudentHasElectiveID,
  validateSemesterID,
  validateEvaluationTypeID,
  validateSpecializationID,
  validateElectiveID,
  validateStudentHasSemesterID,
  validateNumber,
} from './studentHasSemester.modules.js';

const studentHasSemesterRoute = express.Router();
studentHasSemesterRoute.get('/evaluationType', listEvaluationType);
const verifyPermissionWithExpirationMiddleware = (req, res, next) => {
  const { number, evaluationTypeID } = req.body;
  let permissionID = 0;
  // Manejar el nombre del permiso basado en el número
  if (number === 1) {
    // Permiso para Escoger 1° Electivo
    permissionID = 2;
  } else if (number === 2) {
    // Permiso para Escoger 2° Electivo
    permissionID = 3;
  }

  if (evaluationTypeID == 1) {
    // Si el evaluationTypeID es 1, el permiso es 'Permiso para Comenzar Anteproyecto'
    permissionID = 4;
  } else if (evaluationTypeID == 2) {
    // Si el evaluationTypeID es 2, el permiso es 'Permiso para Comenzar Tesis'
    permissionID = 5;
  }

  // Llamar a verifyPermissionWithExpiration con el nombre del permiso
  return verifyPermissionWithExpiration(permissionID)(req, res, next);
};
studentHasSemesterRoute.route('/elective')
  .get(listStudentHasElective)
  .post(
    validateSpecializationID,
    validateElectiveID,
    validateSemesterID,
    validateNumber,
    verifyPermissionWithExpirationMiddleware,
    verifyElective,
    createStudentHasElective,
  )
  .put(
    validateStudentHasElectiveID,
    validateSpecializationID,
    validateElectiveID,
    validateSemesterID,
    validateNumber,
    verifyPermissionWithExpirationMiddleware,
    verifyElective,
    updateStudentHasElective,
  );
studentHasSemesterRoute.route('/')
  .get(listStudentHasSemester)
  .post(
    validateSpecializationID,
    validateEvaluationTypeID,
    validateSemesterID,
    verifyPermissionWithExpirationMiddleware,
    verificationApproval,
    createStudentHasSemester,
  )
  .put(
    validateStudentHasSemesterID,
    validateSpecializationID,
    validateSemesterID,
    verifyPermissionWithExpirationMiddleware,
    verificationApproval,
    updateStudentHasSemester,
  );

export default studentHasSemesterRoute;
