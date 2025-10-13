import {
  express, processExcel, handleExcelUpload, inviteUsers,
} from './importUsersModules.js';

const importUsersRoute = express.Router();

importUsersRoute.post('/', handleExcelUpload, processExcel, inviteUsers);

export default importUsersRoute;
