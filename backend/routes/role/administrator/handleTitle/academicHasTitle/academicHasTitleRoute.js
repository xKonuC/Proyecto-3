import {
  express,
  handleFileUpload,
  uploadArchiveToBucket,
  listTitle,
  listAcademicHasTitle,
  createAcademicHasTitle,
  updateAcademicHasTitle,
  deleteAcademicHasTitle,
  validateUserID,
  validateTitleID,
  validateArrayAcademicHasTitleID,
  validateTitleYear,
  validateStudyField,
  validateAcademicHasTitleID,
} from './academicHasTitleModules.js';

const academicHasTitleRoute = express.Router();

academicHasTitleRoute.get('/title', listTitle);// ✅

academicHasTitleRoute.route('/')
  .get(validateUserID, listAcademicHasTitle)// ✅
  .post(validateUserID, validateTitleID, validateTitleYear, validateStudyField, handleFileUpload, uploadArchiveToBucket, createAcademicHasTitle)// ✅
  .put(validateTitleID, validateUserID, validateTitleYear, validateAcademicHasTitleID, validateStudyField, handleFileUpload, uploadArchiveToBucket, updateAcademicHasTitle)// ✅
  .delete(validateArrayAcademicHasTitleID, validateUserID, deleteAcademicHasTitle);// ✅

export default academicHasTitleRoute;
