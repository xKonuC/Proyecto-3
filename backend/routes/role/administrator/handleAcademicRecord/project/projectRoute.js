import {
  express,
  listProject,
  createProject,
  updateProject,
  deleteProject,
  validateUserID,
  validateProjectID,
  validateProject,
  validateArrayProjectID,
} from './project.modules.js';

const projectRoute = express.Router();

projectRoute.route('/')
  .get(validateUserID, listProject)
  .post(validateUserID, validateProject, createProject)
  .put(validateUserID, validateProjectID, validateProject, updateProject)
  .delete(validateArrayProjectID, deleteProject);

export default projectRoute;
