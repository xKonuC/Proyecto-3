import {
  express,
  handleFileUpload,
  uploadArchiveToBucket,
  verifyPermission,
  listComments,
  listEvaluationRubric,
  listEvaluation,
  createEvaluation,
  manageEvaluation,
  updateEvaluation,
  getProjectURL,
  deleteProjectURL,
  verifyEvaluationStatus,
  verifyUpdatedEvaluationStatus,
  verifyStudentHasSemester,
  validateEvaluatorCategoryID,
  validateEvaluationID,
  validateRubricID,
  validateStudentHasSemesterID,
  validateEvaluationTypeID,
} from './evaluation.modules.js';

const evaluationRoute = express.Router();
const verifyPermissionWithExpirationMiddleware = (req, res, next) => {
  const { evaluationTypeID } = req.body;
  let permissionID = 0;

  if (evaluationTypeID == 1) {
    // Si el evaluationTypeID es 1, el permiso es 'Permiso para Comenzar Anteproyecto'
    permissionID = 4;
  } else if (evaluationTypeID == 2) {
    // Si el evaluationTypeID es 2, el permiso es 'Permiso para Comenzar Tesis'
    permissionID = 5;
  }
  // Llamar a verifyPermissionWithExpiration con el nombre del permiso
  return verifyPermission(permissionID)(req, res, next);
};
evaluationRoute.get(
  '/evaluationRubric',
  validateEvaluationID,
  validateEvaluationTypeID,
  validateStudentHasSemesterID,
  validateRubricID,
  verifyStudentHasSemester,
  listEvaluationRubric,
);
evaluationRoute.get(
  '/comments',
  validateEvaluationID,
  validateEvaluatorCategoryID,
  verifyStudentHasSemester,
  listComments,
);
evaluationRoute.route('/')
  .get(
    validateEvaluationTypeID,
    validateStudentHasSemesterID,
    verifyStudentHasSemester,
    listEvaluation,
  )
  .post(
    validateEvaluationTypeID,
    validateStudentHasSemesterID,
    verifyPermissionWithExpirationMiddleware,
    verifyStudentHasSemester,
    verifyEvaluationStatus,
    handleFileUpload,
    uploadArchiveToBucket,
    createEvaluation,
    manageEvaluation,
  )
  .put(
    validateEvaluationTypeID,
    validateEvaluationID,
    validateStudentHasSemesterID,
    verifyPermissionWithExpirationMiddleware,
    verifyStudentHasSemester,
    verifyUpdatedEvaluationStatus,
    getProjectURL,
    handleFileUpload,
    deleteProjectURL,
    uploadArchiveToBucket,
    updateEvaluation,
  );

export default evaluationRoute;
