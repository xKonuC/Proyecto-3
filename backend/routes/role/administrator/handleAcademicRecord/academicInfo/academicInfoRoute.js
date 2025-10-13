import {
  express,
  listAcademicInfo,
  createAcademicInfo,
  updateAcademicInfo,
  validateUserID,
  validateBestDegreeID,
  validateAcademicInfo,
} from './academicInfo.modules.js';

const academicInfoRoute = express.Router();

academicInfoRoute.route('/')
  .get(validateUserID, listAcademicInfo)
  .post(validateUserID, validateBestDegreeID, validateAcademicInfo, createAcademicInfo)
  .put(validateUserID, validateBestDegreeID, validateAcademicInfo, updateAcademicInfo);

export default academicInfoRoute;
