import {
  express, titleRoute, studentHasTitleRoute, academicHasTitleRoute, universityRoute,
} from './handleTitleModules.js';

const handleTitleRoute = express.Router();

handleTitleRoute.use('/title', titleRoute);
handleTitleRoute.use('/studentHasTitle', studentHasTitleRoute);
handleTitleRoute.use('/academicHasTitle', academicHasTitleRoute);
handleTitleRoute.use('/university', universityRoute);

export default handleTitleRoute;
