import {
  express, questionRoute, templateHasQuestionRoute, templateHasSectionRoute, templateRoute, sectionRoute, rubricRoute,
} from './handleRubricModules.js';

const handleRubricRoute = express.Router();
handleRubricRoute.use('/template', templateRoute);
handleRubricRoute.use('/question', questionRoute);
handleRubricRoute.use('/templateHasQuestion', templateHasQuestionRoute);
handleRubricRoute.use('/templateHasSection', templateHasSectionRoute);
handleRubricRoute.use('/section', sectionRoute);
// El Encargado debe asignar un rubrica
handleRubricRoute.use('/rubric', rubricRoute);

export default handleRubricRoute;
