import {
  express, listSemester, createSemester, updateSemester, deleteSemester, validateArraySemesterID, validateSemesterID, validateYear, validateSemesterNumber, validateStartDate, validateFinishDate,
} from './semesterModules.js';

const semesterRoute = express.Router();
semesterRoute.route('/')
  .get(listSemester)
  .post(validateYear, validateSemesterNumber, validateStartDate, validateFinishDate, 
    createSemester)
  .put(validateYear, validateSemesterNumber, validateSemesterID, validateStartDate, validateFinishDate, 
    updateSemester)
  .delete(validateArraySemesterID, 
    deleteSemester);

export default semesterRoute;
