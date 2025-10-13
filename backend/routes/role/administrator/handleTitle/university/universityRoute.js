import {
  express, listUniversity, createUniversity, updateUniversity, deleteUniversity, validateArrayUniversityID, validateUniversityID, validateName, validateCity, validateCountry,
} from './universityModules.js';

const universityRoute = express.Router();

universityRoute.route('/')
  .get(listUniversity)// ✅
  .post(validateName, validateCity, validateCountry, createUniversity)// ✅
  .put(validateUniversityID, validateName, validateCity, validateCountry, updateUniversity)// ✅
  .delete(validateArrayUniversityID, deleteUniversity);// ✅

export default universityRoute;
