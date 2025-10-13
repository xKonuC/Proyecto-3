import {
  express, listDegree, listUniversity, listTitle, createTitle, updateTitle, deleteTitle, validateTitleID, validateArrayTitleID, validateName, validateDegreeID, validateUniversityID, validateAreaID,
} from './titleModules.js';

const titleRoute = express.Router();

titleRoute.get('/degree', listDegree);// ✅
titleRoute.get('/university', listUniversity);// ✅

titleRoute.route('/')
  .get(listTitle)// ✅
  .post(validateName, validateUniversityID, validateDegreeID, validateAreaID, createTitle)// ✅
  .put(validateTitleID, validateName, validateUniversityID, validateDegreeID, validateAreaID, updateTitle)// ✅
  .delete(validateArrayTitleID, deleteTitle);// ✅

export default titleRoute;
