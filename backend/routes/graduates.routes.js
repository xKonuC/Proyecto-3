import {
  express, authRoute, roleRoute, validateToken,
} from './routes.modules.js';
import graduatesRoute from './graduates.route.js';

const routes = express.Router();
routes.use('/auth', authRoute);
routes.use(
  '/role',
  validateToken,
  roleRoute,
);
routes.use(
  '/graduates',
  validateToken,
  graduatesRoute,
);

export default routes;
