import {
  express,
  userRoute,
} from './graduate.modules.js';

const graduateRoute = express.Router();
graduateRoute.use('/user', userRoute);

export default graduateRoute;
