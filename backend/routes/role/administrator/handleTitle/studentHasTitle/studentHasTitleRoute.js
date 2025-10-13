import {
  express, handleFileUpload, uploadArchiveToBucket, listTitle, listStudentHasTitle, createStudentHasTitle, updateStudentHasTitle, deleteStudentHasTitle, validateUserID, validateTitleID, validateStudentHasTitleID, validateArrayStudentHasTitleID, validateTitleYear,
} from './studentHasTitleModules.js';

const studentHasTitleRoute = express.Router();

studentHasTitleRoute.get('/title', listTitle);// ✅

studentHasTitleRoute.route('/')
  .get(validateUserID, listStudentHasTitle)// ✅
  .post(validateUserID, validateTitleID, validateTitleYear, handleFileUpload, uploadArchiveToBucket, createStudentHasTitle)// ✅
  .put(validateStudentHasTitleID, validateTitleID, validateTitleYear, updateStudentHasTitle)// ✅
  .delete(validateArrayStudentHasTitleID, deleteStudentHasTitle);// ✅

export default studentHasTitleRoute;
