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

<<<<<<< HEAD
export default routes;
=======
export default routes;
>>>>>>> c98ce8ccd65bda4ebabc9fcc45e29e80f6436df3
