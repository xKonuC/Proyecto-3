import {
  express,
  userRoute,
  handleSpecializationRoute,
} from './student.modules.js';

const studentRoute = express.Router();
studentRoute.use('/user', userRoute);
studentRoute.use('/specialization', handleSpecializationRoute);

export default studentRoute;
