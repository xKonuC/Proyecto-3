import {
  express,
  listAcademicRecord,
  validateUserID,
} from './academicRecord.modules.js';

const academicRecordRoute = express.Router();

academicRecordRoute.route('/')
  .get(validateUserID, listAcademicRecord);

export default academicRecordRoute;
