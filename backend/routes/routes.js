import {
  express, authRoute, roleRoute, validateToken,
} from './routes.modules.js';

const routes = express.Router();
routes.use('/auth', authRoute);
routes.use(
  '/role',
  validateToken,
  roleRoute,
);
export default routes;
