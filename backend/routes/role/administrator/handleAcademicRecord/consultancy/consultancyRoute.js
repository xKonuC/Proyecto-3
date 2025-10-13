import {
  express,
  listConsultancy,
  createConsultancy,
  updateConsultancy,
  deleteConsultancy,
  validateUserID,
  validateConsultancyID,
  validateConsultancy,
  validateArrayConsultancyID,
} from './consultancy.modules.js';

const consultancyRoute = express.Router();

consultancyRoute.route('/')
  .get(validateUserID, listConsultancy)
  .post(validateUserID, validateConsultancy, createConsultancy)
  .put(validateUserID, validateConsultancyID, validateConsultancy, updateConsultancy)
  .delete(validateArrayConsultancyID, deleteConsultancy);

export default consultancyRoute;
